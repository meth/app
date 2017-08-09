import Q = from 'bluebird'

const { loadConfig } = require('../config'),
  log = require('../logger').create('NodeConnector')

const {
  STATUS,
  BACKEND_TASKS: {
    CONNECT_TO_NODE
  }
} = require('../../common/constants')



class NodeConnector {
  constructor () {
    this._adapter = null
    this._window = null
  }

  get isConnected () {
    return null !== this._adapter
  }

  /**
   * Initialise the node connector.
   */
  async init () {
    if (!this._nodes) {
      try {
        await this._loadConfig()
      } catch (err) {
        log.error('Error intializing node connector', err)

        this._notifyUi(STATUS.ERROR, err.toString())
      }
    }
  }

  async _loadConfig () {
    log.info('Load config...')

    const { networks, nodes } = await Q.props({
      networks: loadConfig('networks'),
      nodes: loadConfig('nodes'),
    })

    this._networks = networks
    this._nodes = nodes

    this._notifyUi(STATUS.PREPARE, this._nodes)
  }

  _notifyUi (status, data) {
    log.debug('Notify main UI', status)

    global.Ipc.notifyMainUi(CONNECT_TO_NODE, status, data)
  }
}


module.exports = new NodeConnector()
