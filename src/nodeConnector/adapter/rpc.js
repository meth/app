import { isAndroid, isEmulator } from '../../utils/deviceInfo'
import { loadJSON } from '../../utils/fetch'
import { Adapter } from './base'

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
  eth_newBlockFilter: true,
  eth_newPendingTransactionFilter: true,
  eth_uninstallFilter: true,
  eth_getFilterChanges: true,
  eth_getFilterLogs: true,
  eth_getLogs: true,
  eth_getWork: true,
  shh_version: true,
  shh_newFilter: true,
  shh_uninstallFilter: true,
  shh_getFilterChanges: true,
  shh_getMessages: true
}

const LOCALHOST = 'http://127.0.0.1'

export default class RpcAdapter extends Adapter {
  constructor (nodeConfig) {
    super(nodeConfig, 'rpc', METHODS)

    this._url = nodeConfig.url

    // if URL points to localhost and we're running in the Android emulator then
    // use 10.0.2.2 instead as per Android docs
    if (this._url.startsWith(LOCALHOST) && isAndroid && isEmulator) {
      this._log.debug('Android emulator, so using 10.0.2.2 instead of 127.0.0.1')
      this._url = `http://10.0.2.2${this._url.substr(LOCALHOST.length)}`
    }
  }

  async _doExecMethod (id, method, params = []) {
    try {
      await this._checkMethodAllowed(method)

      this._log.trace(`Calling ${this._url} with method ${method}`)

      const json = await loadJSON(
        this._url,
        'POST',
        {},
        {
          jsonrpc: '2.0',
          id,
          method,
          params
        }
      )

      if (json.error) {
        this._throwError(JSON.stringify(json.error), json)
      } else {
        return json.result
      }
    } catch (err) {
      this._log.trace('Method call error', err)

      throw err
    }

    return true
  }
}
