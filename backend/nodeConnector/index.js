const Q = require('bluebird')

const Windows = require('../windows'),
  { loadConfig } = require('../config'),
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
    if (!this._window) {
      log.debug('Creating node connector window')

      // Create the window - the window will then orchestrate the next steps
      this._window = Windows.createPopup('ConnectToNode', {
        unique: true,
        electronOptions: {
          width: 580,
          height: 350,
          titleBarStyle: 'default',
          alwaysOnTop: true,
        },
      })

      try {
        await this._window.onceReady()
        await this._loadConfig()
      } catch (err) {
        log.error('Error intializing node connector', err)

        global.Ipc.notifyAllUis(CONNECT_TO_NODE, STATUS.ERROR, err.toString())
      }
    }
  }

  async _loadConfig () {
    const { networks, nodes } = await Q.props({
      networks: loadConfig('networks'),
      nodes: loadConfig('nodes'),
    })

    this._networks = networks
    this._nodes = nodes
  }

  handleIpcFromUi (params) {
    switch (params) {
      case STATUS.PREPARE:
        this._notifyUi(STATUS.PREPARE, this._nodes)
        break
    }
  }

  _notifyUi (status, data) {
    global.Ipc.notifyUi(this._window, CONNECT_TO_NODE, status, data)
  }
}


module.exports = new NodeConnector()
