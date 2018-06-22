import EventEmitter from 'eventemitter3'

import { hexToNumber } from '../../utils/number'
import scheduler from '../../scheduler'
import EVENT from '../../../common/constants/events'
import STATE from '../../../common/constants/states'
import logger from '../../logger'
import {
  instanceOfError,
  UnableToConnectError,
  RequestTimeoutError,
  CorruptDataError,
  MethodNotAllowedError
} from '../../utils/errors'

const log = logger.create('Adapter')


const SHAREABLE_METHOD_CALLS = {
  net_version: true,
  net_listening: true,
  net_peerCount: true,
  eth_protocolVersion: true,
  eth_syncing: true,
  eth_coinbase: true,
  eth_mining: true,
  eth_gasPrice: true,
  eth_hashrate: true,
  eth_blockNumber: true,
  eth_getBalance: true,
  eth_getStorageAt: true,
  eth_getTransactionCount: true,
  eth_getBlockTransactionCountByHash: true,
  eth_getBlockTransactionCountByNumber: true,
  eth_getUncleCountByBlockHash: true,
  eth_getUncleCountByBlockNumber: true,
  eth_getCode: true,
  eth_getBlockByHash: true,
  eth_getBlockByNumber: true,
  eth_getTransactionByHash: true,
  eth_getTransactionByBlockHashAndIndex: true,
  eth_getTransactionByBlockNumberAndIndex: true,
  eth_getTransactionReceipt: true,
  eth_getUncleByBlockHashAndIndex: true,
  eth_getUncleByBlockNumberAndIndex: true,
  eth_getLogs: true
}


/**
 * Base node connection adapter
 *
 * Supports stateful connection.
 */
class Adapter extends EventEmitter {
  /**
   * @constructor
   * @param  {Object} nodeConfig node config
   * @param  {String} adapterType
   * @param  {Object} availableMethods (String method_name => Boolean allowed)
   */
  constructor (nodeConfig, adapterType, availableMethods) {
    super()

    this._adapterType = adapterType
    this._nodeConfig = nodeConfig
    this._methods = availableMethods
    this._callId = 0 // 'id' incremental counter
    this._state = STATE.DISCONNECTED
    this._callPromises = {}

    this._log = log.create(adapterType)
  }

  get isConnected () {
    return STATE.CONNECTED === this._state
  }

  get state () {
    return this._state
  }

  _updateState (state) {
    if (this._state !== state) {
      this._state = state

      this.emit(EVENT.STATE_CHANGE, state)
    }
  }

  /**
   * Connect.
   * @return {Promise}
   */
  async connect () {
    if (STATE.CONNECTED === this._state) {
      this._log.trace('Already connected')

      return Promise.resolve()
    }

    if (STATE.CONNECTING === this._state && this._connectPromise) {
      this._log.trace('Already connecting')

      return this._connectPromise
    }

    this._log.trace('Connecting...')
    this._updateState(STATE.CONNECTING, 'Connecting...')

    this._connectPromise = this._connect()

    try {
      await this._connectPromise

      this._log.trace('Connected')

      this._connectPromise = null
      this._updateState(STATE.CONNECTED)

      this._startPoll()
    } catch (err) {
      this._log.trace('Connection error', err)

      this._updateState(STATE.CONNECT_ERROR)

      throw err
    }

    return true
  }

  /**
   * Disconnect.
   *
   * @return {Promise}
   */
  async disconnect () {
    if (STATE.DISCONNECTED === this._state) {
      this._log.trace('Already disconnected')

      return Promise.resolve()
    }

    if (STATE.DISCONNECTING === this._state && this._disconnectPromise) {
      this._log.trace('Already disconnecting')

      return this._disconnectPromise
    }

    this._log.trace('Disconnecting...')
    this._stopPoll()
    this._updateState(STATE.DISCONNECTING)
    this._disconnectPromise = this._disconnect()

    try {
      await this._disconnectPromise

      this._log.trace('Disconnected')

      this._disconnectPromise = null
      this._updateState(STATE.DISCONNECTED)
    } catch (err) {
      this._log.trace('Disconnection error', err)

      throw err
    }

    return true
  }

  /**
   * Execute a method
   * @return {Promise}
   */
  async execMethod (method, params) {
    try {
      this._callId += 1

      const ret = await this._doSharedExecMethod(this._callId, method, params)

      this._updateState(STATE.CONNECTED)

      return ret
    } catch (err) {
      this._log.debug('Method exec error', err)

      // augment the error
      err.method = method
      err.params = params

      // when using ganache the 'message' param is JSON string
      try {
        const msgDetails = JSON.parse(err.message)

        err.message = msgDetails.message
        err.subError = msgDetails
      } catch (err2) {
        // nothing to do!
      }

      // if connection error then update state
      if (
        instanceOfError(
          err,
          UnableToConnectError,
          CorruptDataError,
          RequestTimeoutError
        )
      ) {
        this._updateState(STATE.CONNECTION_ERROR)
      } else {
        this._updateState(STATE.CONNECTED)
      }

      throw err
    }
  }

  /**
   * Actual connect method.
   *
   * Subclasses may override this.
   *
   * @return {Promise}
   */
  async _connect () {
    this._log.trace('Connect...', this._url)

    try {
      await this.execMethod('eth_blockNumber')

      this._log.trace('Connection successful')
    } catch (err) {
      this._log.trace('Connection failed', err)

      throw err
    }
  }

  /**
   * Actual disconnect method.
   *
   * Subclasses may override this.
   *
   * @return {Promise}
   */
  async _disconnect () {
    this._log.debug('Disconnected')

    return Promise.resolve()
  }


  /**
   * Do a shared method execution.
   *
   * Certain methods do not need to be repeated. For example, if 5 calls come into
   * fetch the latest block then only one actual request to the network needs
   * to be made to satisfy all 5 calls. The logic in this method takes care of
   * this.
   *
   * @return {Promise}
   */
  _doSharedExecMethod (id, method, params) {
    const sig = JSON.stringify({ method, params })

    const existing = this._callPromises[sig]

    if (SHAREABLE_METHOD_CALLS[method] && existing) {
      this._log.debug(`Call ${id} will piggyback on call ${existing.id} which is in-progress`)

      return existing
    }

    const promise =
      this._doExecMethod(id, method, params)
        .then(data => {
          delete this._callPromises[sig]

          return data
        })
        .catch(err => {
          delete this._callPromises[sig]

          throw err
        })

    if (SHAREABLE_METHOD_CALLS[method]) {
      this._callPromises[sig] = { promise, id }
    }

    return promise
  }


  /**
   * Execute a method, to be implemented by subclasses
   * @return {Promise}
   */
  async _doExecMethod () {
    throw new Error('Not yet implemented')
  }

  /**
   * Check that given method call is allowed
   * @param  {String} method
   * @return {Promise}
   */
  async _checkMethodAllowed (method) {
    if (true !== this._methods[method]) {
      throw new MethodNotAllowedError(method)
    }
  }

  /**
   * Start polling for latest block.
   *
   * Subclasses may override this.
   */
  _startPoll = () => {
    this._log.info(`Start polling for blocks`)

    this._poll = scheduler.addJob('block_poll', 15, () => this._doPoll())
  }

  /**
   * Stop polling for latest block.
   *
   * Subclasses may override this.
   */
  _stopPoll = () => {
    this._log.info(`Stop polling for blocks`)

    if (this._poll) {
      scheduler.removeJob(this._poll)

      delete this._poll
    }
  }

  /**
   * Poll for latest block.
   *
   * Subclasses may override this.
   */
  async _doPoll () {
    if (STATE.CONNECTED !== this.state) {
      // definitely stop it!
      this._stopPoll()

      return
    }

    this._log.debug(`Polling node state ...`)

    const [ block, syncing ] = await Promise.all([
      this.execMethod('eth_getBlockByNumber', [
        'latest',
        false
      ]),
      this.execMethod('eth_syncing')
    ])

    const newBlockHash = block.hash

    if (newBlockHash !== this._lastBlockHash) {
      this._log.debug(`Got new block: ${hexToNumber(block.number)}`)

      this._lastBlockHash = newBlockHash

      this.emit(EVENT.NEW_BLOCK, block)
    }

    if (syncing !== this._lastSyncing) {
      this._log.debug(`Sync status changed to: ${syncing ? 'true' : 'false'}`)

      this._lastSyncing = syncing

      this.emit(EVENT.SYNCING, syncing)
    }
  }

  /**
   * Construct and throw an error
   * @param  {String} errMsg  [description]
   * @param  {Object} details [description]
   * @throws {Error}
   */
  _throwError (errMsg, details) {
    const e = new Error(errMsg)
    e.details = details
    throw e
  }
}

exports.Adapter = Adapter
