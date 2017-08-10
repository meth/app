import EventEmitter from 'eventemitter3'

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

    throw new Error('blah: ' + Math.random(1000))
  }
}
