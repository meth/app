import EventEmitter from 'eventemitter3'

import RpcAdapter from './rpc'
const log = require('../utils/log').create('NodeConnector')



export default class NodeConnector extends EventEmitter {
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

    // work out what network we're on
    const block = await adapter.call('eth_getBlockByNumber', [0])

    console.log(block)

  }
}
