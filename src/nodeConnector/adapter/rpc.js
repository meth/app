import Q from 'bluebird'

import { loadJSON } from '../../utils/fetch'
import { Adapter } from './base'


class RpcAdapter extends Adapter {
  constructor (nodeConfig) {
    super(nodeConfig, 'rpc', METHODS)

    this._url = nodeConfig.url
  }

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

  async _disconnect () {
    this._log.debug('Disconnected')

    return Q.resolve()
  }

  async _doExecMethod (id, method, params = []) {
    try {
      await this._approveMethod(method)

      this._log.trace(`Calling ${this._url} with method ${method}`)

      const json = await loadJSON(this._url, 'POST', {}, {
        jsonrpc: '2.0',
        id,
        method,
        params,
      })

      if (json.error) {
        this._throwError(JSON.stringify(json.error), json)
      } else {
        return json.result
      }
    } catch (err) {
      this._log.trace('Method call error', err)

      throw err
    }
  }
}

module.exports = RpcAdapter


/**
 * Approved/disapproved methods
 * @type {Object}
 */
const METHODS = {
  net_version: true,
  net_listening: true,
  net_peerCount: true,
  eth_protocolVersion: true,
  eth_syncing: true,
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
  eth_sendRawTransaction: true,
  eth_call: true,
  eth_estimateGas: true,
  eth_getBlockByHash: true,
  eth_getBlockByNumber: true,
  eth_getTransactionByHash: true,
  eth_getTransactionByBlockHashAndIndex: true,
  eth_getTransactionByBlockNumberAndIndex: true,
  eth_getTransactionReceipt: true,
  eth_getUncleByBlockHashAndIndex: true,
  eth_getUncleByBlockNumberAndIndex: true,
}
