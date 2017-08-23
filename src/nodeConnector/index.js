import EventEmitter from 'eventemitter3'

import RpcAdapter from './adapter/rpc'
const log = require('../utils/log').create('NodeConnector')



export class NodeConnector extends EventEmitter {
  constructor ({ networks }) {
    super()

    this._networks = networks
    this._adapter = null
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

    log.info(`Connecting to ${name} at ${url} of type ${type}`)

    let adapter

    switch (type) {
      case 'rpc':
        adapter = new RpcAdapter({ url })
        break
      default:
        throw new Error(`Unrecognized adapter type: ${type}`)
    }

    await adapter.connect()

    // get genesis block
    return adapter.call('eth_getBlockByNumber', ['0x0', false])
  }
}




/**
 * Connection for an individual dapp.
 *
 * This piggy backs on a `NodeConnector`.
 */
export class DappConnection {
  constructor (nodeConnector, id) {
    this._nodeConnector = nodeConnector

    this._log = log.create(`dapp-${id}`)
  }

  /**
   * Make a request
   * @param  {Object|Array} payload Either a single or batch request
   * @return {Promise}
   */
  async request (payload) {

  }
}
