import EventEmitter from 'eventemitter3'
import Web3 from 'web3'
import ethers from 'ethers'

import { Web3MethodFactory } from './web3Methods'
import EVENT from '../../common/constants/events'
import STATE from '../../common/constants/states'
import { UnableToConnectError } from '../utils/errors'
import logger from '../logger'
import RpcAdapter from './adapter/rpc'

const log = logger.create('NodeConnector')

class NodeConnector extends EventEmitter {
  constructor () {
    super()

    this._adapter = null
    this._wrapResponse = this._wrapResponse.bind(this)
  }

  init ({ store, walletManager }) {
    this._store = store
    this._walletManager = walletManager

    this._methodFactory = new Web3MethodFactory({
      nodeConnector: this,
      store: this._store,
      walletManager
    })

    this._state = STATE.PREPARE

    // keep track of what's going on in connector
    this.on(EVENT.STATE_CHANGE, newState => {
      switch (newState) {
        case STATE.CONNECTION_ERROR: {
          store.actions.nodeDisconnected(STATE.CONNECTION_ERROR)
          break
        }
        case STATE.DISCONNECTED: {
          store.actions.nodeDisconnected()
          break
        }
        default:
          break
      }
    })

    this.on(EVENT.NEW_BLOCK, block => {
      store.actions.notifyNewBlock(block)
    })

    this.on(EVENT.SYNCING, syncing => {
      store.actions.notifySyncing(syncing)
    })
  }

  setNetworks (networks) {
    log.debug('Set networks', networks)

    this._networks = networks
  }

  get isConnected () {
    return null !== this._adapter && this._adapter.isConnected
  }

  /**
   * Connect to given node.
   * @type {Promise}
   */
  async connect (cfg) {
    const { name, url, type } = cfg

    // disconnect first
    await this.disconnect()

    log.info(`Connecting to ${name} at ${url} of type ${type} ...`)

    switch (type) {
      case 'rpc':
        this._adapter = new RpcAdapter({ url })
        break
      default:
        throw new UnableToConnectError(`Unrecognized adapter type: ${type}`)
    }

    try {
      // propagate state changes
      this._adapter.on(EVENT.STATE_CHANGE, (...args) => {
        this._updateState(...args)
      })

      // connect
      await this._adapter.connect()

      // get genesis block
      const block = await this.rawCall('eth_getBlockByNumber', [ '0x0', false ])

      // work out what network we're on
      const networkId = Object.keys(this._networks).find(key => {
        const n = this._networks[key]

        return n.genesisBlock === block.hash
      })

      const foundNetwork = this._networks[networkId]

      const network = foundNetwork
        ? { ...foundNetwork }
        : // if no match found then assume it's a private network
        { ...this._networks.private }

      network.id = networkId
      network.genesisBlock = block.hash

      this._adapter.on(EVENT.NEW_BLOCK, (...args) => {
        this.emit(EVENT.NEW_BLOCK, ...args)
      })
      this._adapter.on(EVENT.SYNCING, (...args) => {
        this.emit(EVENT.SYNCING, ...args)
      })

      log.info(`Connected to network: ${network.description}`)

      return network
    } catch (err) {
      throw new UnableToConnectError(err.message)
    }
  }

  /**
   * Disconnect current adapter.
   * @return {Promise}
   */
  async disconnect () {
    if (this.isConnected) {
      log.info(`Disconnecting current connection ...`)

      await this._adapter.disconnect()
    }

    this._adapter = null
  }

  /**
   * Make a web3 request that gets processed by our method handlers.
   *
   * @param {Object|Array} payload Either a single or batch request
   * @param {Object} context Context in which method is being called
   * @param {String} [context.permissions] Dapp permissions
   * @return {Promise}
   */
  async request (payload, context) {
    log.debug('Request', payload, context)

    const isBatch = payload instanceof Array

    const finalPayload = !isBatch ? [ payload ] : payload

    // we will serially process the requests (as expected with batch requests)
    const result = []

    // eslint-disable-next-line no-restricted-syntax
    for (const { id, method, params } of finalPayload) {
      log.trace('Request', { id, method, params })

      try {
        this._ensureConnected()

        result.push({
          id,
          // eslint-disable-next-line no-await-in-loop
          result: await this._methodFactory
            .getHandler(method)
            .run(params, context)
        })
      } catch (err) {
        err.method = method

        result.push({
          id,
          error: err
        })
      }
    }

    // process results
    const responses = result.map(this._wrapResponse)

    const ret = isBatch ? responses : responses[0]

    log.trace('Response', ret)

    return ret
  }

  /**
   * Make a raw method call directly to the adapter.
   *
   * @param  {String} method web3 method
   * @param  {Array} [params]
   * @return {Promise}
   */
  async rawCall (method, params = []) {
    this._ensureConnected()

    return this._adapter.execMethod(method, params)
  }

  getContractAt (address, { abi }) {
    return new ethers.Contract(
      address,
      abi,
      ethers.providers.Web3Provider(this.web3)
    )
  }

  _updateState (newState, data) {
    if (this._state !== newState) {
      this._state = newState

      this.emit(EVENT.STATE_CHANGE, newState, data)
    }
  }

  _ensureConnected () {
    if (!this.isConnected || !this._adapter) {
      // if in a connected state then update state
      // (guard ensures we minimize no. of events getting sent)
      if (STATE.PREPARE === this._state || STATE.CONNECTED === this._state) {
        this._updateState(STATE.DISCONNECTED)
      }

      throw new UnableToConnectError('Adapter not connected')
    }
  }

  _wrapResponse ({ id, result, error }) {
    if (error) {
      return {
        jsonrpc: '2.0',
        id,
        error: error.toString()
      }
    }

    return {
      jsonrpc: '2.0',
      id,
      result
    }
  }
}

const nodeConnector = new NodeConnector()

export default nodeConnector

class Web3ProxyProvider {
  isConnected () {
    return nodeConnector.isConnected
  }

  send () {
    throw new Error('Synchronous web3 calls are not supported.')
  }

  sendAsync (payload, callback) {
    nodeConnector
      .request(payload, { fullAccess: true })
      .catch(callback)
      .then(response => {
        const hasError = [].concat(response).find(r => !!r.error)

        if (hasError) {
          callback(response)
        } else {
          callback(null, response)
        }
      })
  }
}

nodeConnector.web3 = new Web3(new Web3ProxyProvider())
