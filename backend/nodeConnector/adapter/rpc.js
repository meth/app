const Q = require('bluebird')
const got = require('got')

const { Adapter } = require('./base')

class RpcAdapter extends Adapter {
  constructor (nodeConfig) {
    super(nodeConfig, 'rpc', METHODS)

    this._url = nodeConfig.url
  }

  _connect () {
    this._log.trace('Connect...', this._url)

    return this.call('eth_blockNumber')
      .then(data => {
        this._log.trace('Connection successful')
      })
      .catch(err => {
        this._log.trace('Connection failed', err)

        throw err
      })
  }

  _disconnect () {
    this._log.debug('Disconnected')

    return Q.resolve()
  }

  call (method, params = []) {
    return this._approveMethod(method)
      .then(() => got.post(this._url, {
        encoding: 'utf8',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jsonrpc: '2.0',
          id: 0,
          method,
          params,
        }),
      }))
      .then(res => res.body)
      .catch(err => {
        this._log.trace(`Call failed: ${method}`, err)

        throw err
      })
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
