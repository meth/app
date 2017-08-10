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
      const data = await this.call('eth_blockNumber')

      this._log.trace('Connection successful')

      return data
    } catch (err) {
      this._log.trace('Connection failed', err)

      throw err
    }
  }

  async _disconnect () {
    this._log.debug('Disconnected')

    return Q.resolve()
  }

  async call (method, params = []) {
    try {
      await this._approveMethod(method)

      return await loadJSON(this._url, 'GET', {}, {
        jsonrpc: '2.0',
        id: 0,
        method,
        params,
      })
    } catch (err) {
      this._log.trace(`Call failed: ${method}`, err)

      throw err
    }
  }
}

module.exports = RpcAdapter

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
