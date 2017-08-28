import Q from 'bluebird'
import EventEmitter from 'eventemitter3'

import { EVENT, STATE, ERROR } from '../../../common/constants'
const log = require('../../utils/log').create('Adapter')



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

    this._log = log.create(adapterType)
  }

  get isConnected () {
    return STATE.CONNECTED === this._state
  }

  get state () {
    return this._state
  }

  _updateState (state) {
    this._state = state

    this.emit(EVENT.STATE_CHANGE, state)
  }

  /**
   * Connect.
   * @return {Promise}
   */
  async connect () {
    if (STATE.CONNECTED === this._state) {
      this._log.trace('Already connected')

      return Q.resolve()
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
    } catch (err) {
      this._log.trace('Connection error', err)

      this._updateState(STATE.DISCONNECTED)

      throw err
    }
  }

  /**
   * Disconnect.
   *
   * @return {Promise}
   */
  async disconnect () {
    if (STATE.DISCONNECTED === this._state) {
      this._log.trace('Already disconnected')

      return Q.resolve()
    }

    if (STATE.DISCONNECTING === this._state && this._disconnectPromise) {
      this._log.trace('Already disconnecting')

      return this._disconnectPromise
    }

    this._log.trace('Disconnecting...')
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
  }

  /**
   * Execute a method
   * @return {Promise}
   */
  async execMethod (method, params) {
    try {
      return this._doExecMethod(++this._callId, method, params)
    } catch (err) {
      this._log.debug('Method exec error', err)

      // augment the error
      err.method = method
      err.params = params
      throw err
    }
  }


  /**
   * Execute a method, to be implemented by subclasses
   * @return {Promise}
   */
  async _doExecMethod (requestId, method, params) {
    throw new Error('Not yet implemented')
  }


  /**
   * Approve given method call
   * @param  {String} method
   * @return {Promise}
   */
  async _approveMethod (method) {
    if (true !== this._methods[method]) {
      throw new Error(ERROR.METHOD_NOT_ALLOWED)
    }
  }

  /**
   * Connect implementation.
   * @return {Promise}
   */
  async _connect () {
    throw new Error('Not yet implemented')
  }

  /**
   * Disconnect implementation.
   * @return {Promise}
   */
  async _disconnect () {
    throw new Error('Not yet implemented')
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
