import EventEmitter from 'eventemitter3'

import { Web3MethodFactory } from './web3Methods'
import { ERROR } from '../../common/constants'
import RpcAdapter from './adapter/rpc'
const log = require('../utils/log').create('NodeConnector')


export class NodeConnector extends EventEmitter {
  constructor ({ networks }) {
    super()

    this._networks = networks
    this._adapter = null

    this._wrapResponse = this._wrapResponse.bind(this)

    this._methodFactory = new Web3MethodFactory(this)
  }

  get isConnected () {
    return null !== this._adapter
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

    let adapter

    switch (type) {
      case 'rpc':
        adapter = new RpcAdapter({ url })
        break
      default:
        throw new Error(`Unrecognized adapter type: ${type}`)
    }

    await adapter.connect()

    this._adapter = adapter

    // get genesis block
    return this._callMethod('eth_getBlockByNumber', ['0x0', false])
  }

  /**
   * Disconnect current adapter.
   * @return {Promise}
   */
  async disconnect () {
    if (this.isConnected) {
      log.info(`Disconnecting current connection ...`)

      await this._adapter.disconnect()

      this._adapter = null
    }
  }

  /**
   * Make a web3 JSON RPC request
   *
   * @param {Object|Array} payload Either a single or batch request
   * @param {Object} context Context in which method is being called
   * @param {String} [context.dappUrl] URL of dapp which is calling this method
   * @return {Promise}
   */
  async request (payload, context) {
    log.debug('Request', payload)

    const isBatch = (payload instanceof Array)

    if (!isBatch) {
      payload = [payload]
    }

    // we will serially process the requests (as expected with batch requests)
    const result = []

    for (const { id, method, params } of payload) {
      log.trace('Request', { id, method, params })

      try {
        if (!this.isConnected) {
          throw new Error(ERROR.UNABLE_TO_CONNECT)
        }

        result.push({
          id,
          result: await this._methodFactory.getHandler(method).run(params)
        })
      } catch (err) {
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


  _callMethod (method, params) {
    return this._adapter.execMethod(method, params)
  }


  _wrapResponse ({ id, result, error }) {
    if (error) {
      return {
        jsonrpc: '2.0',
        id,
        error: error.toString(),
      }
    } else {
      return {
        jsonrpc: '2.0',
        id,
        result,
      }
    }
  }
}
