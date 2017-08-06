/**
 * Base adapter class
 */

const Q = require('bluebird')
const EventEmitter = require('eventemitter3')

const { ERROR } = require('../../../common/constants')
const log = require('../../logger').create('NodeAdapter')



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
  constructor (nodeConfig, name, availableMethods) {
    super()

    this._name = name
    this._nodeConfig = nodeConfig
    this._methods = availableMethods
    this._state =

    this._log = log.create(name)
  }

  get state () {
    return this._state
  }

  /**
   * Connect.
   * @return {Promise}
   */
  connect () {
    if (STATE.CONNECTED === this._state) {
      this._log.trace('Already connected')

      return Q.resolve()
    }

    if (STATE.CONNECTING === this._state) {
      this._log.trace('Already connecting')

      return this._connectPromise
    }

    this._log.trace('Connecting...')
    this._state = STATE.CONNECTING
    this._connectPromise = this._connect()

    return this._connectPromise
      .then(() => {
        this._log.trace('Connected')

        this._connectPromise = null
        this._state = STATE.CONNECTED
      })
      .catch(err => {
        this._log.trace('Connection error', err)

        this._state = STATE.DISCONNECTED

        throw err
      })
  }

  /**
   * Disconnect.
   *
   * @return {Promise}
   */
  disconnect () {
    if (STATE.DISCONNECTED === this._state) {
      this._log.trace('Already disconnected')

      return Q.resolve()
    }

    if (STATE.DISCONNECTING === this._state) {
      this._log.trace('Already disconnecting')

      return this._disconnectPromise
    }

    this._log.trace('Disconnecting...')
    this._state = STATE.DISCONNECTING
    this._disconnectPromise = this._disconnect()

    return this._disconnectPromise
      .then(() => {
        this._log.trace('Disconnected')

        this._disconnectPromise = null
        this._state = STATE.DISCONNECTED
      })
      .catch(err => {
        this._log.trace('Disconnection error', err)

        throw err
      })
  }

  /**
   * Approve given method call
   * @param  {String} method
   * @return {Promise}
   */
  _approveMethod (method) {
    if (true !== this._methods[method]) {
      throw new Error(ERROR.METHOD_NOT_ALLOWED)
    }
  }

  /**
   * Connect implementation.
   * @return {Promise}
   */
  _connect () {
    return Q.reject(new Error('Not yet implemented'))
  }

  /**
   * Disconnect implementation.
   * @return {Promise}
   */
  _disconnect () {
    return Q.reject(new Error('Not yet implemented'))
  }
}

exports.Adapter = Adapter

const STATE = exports.STATE = {
  DISCONNECTED: 1,
  DISCONNECTING: 2,
  CONNECTING: 3,
  CONNECTED: 4,
}
