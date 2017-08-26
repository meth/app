import { STATUS } from '../../../../common/constants'
import { Actions, StateActions } from '../../actions'
import { inProgress, success, error } from '../../../utils/stateMachines'
import { CONNECT_NODE } from '../../../utils/modals'
import { NodeConnector } from '../../../nodeConnector'

function initNodeConnector () {
  if (!this._nodeConnector) {
    this._nodeConnector = new NodeConnector(this._getState('config').networks)

    // when node disconnects let's show the node connector
    this._nodeConnector.on(STATUS.DISCONNECTED, reason => {
      this._action(Actions.NODE_DISCONNECTED, reason)
    })
  }

  return this._nodeConnector
}

module.exports = {
  setSelected: function (nodeKey) {
    this._action(Actions.SET_SELECTED_NODE, nodeKey)
  },

  showConnectionModal: function () {
    this.modals.show(CONNECT_NODE)
  },

  hideConnectionModal: function () {
    this.modals.hide(CONNECT_NODE)
  },

  connect: async function (nodeConfig) {
    this._log.info('Connecting to node...')

    this._stateAction(StateActions.CONNECT_NODE, inProgress)

    const connector = initNodeConnector.call(this)

    // keep track of what's going on in connector
    const onConnectingUpdate = (msg) => {
      this._stateAction(StateActions.CONNECT_NODE, inProgress, msg)
    }
    connector.on(STATUS.CONNECTING, onConnectingUpdate)

    try {
      const genesisBlock = await connector.connect(nodeConfig)

      this._log.info('Node connection succeeded!')

      this._stateAction(StateActions.CONNECT_NODE, success, genesisBlock)
    } catch (err) {
      this._log.warn('Node connection failed', err)

      this._stateAction(StateActions.CONNECT_NODE, error, err)

      throw err
    } finally {
      // remove previously set event listener
      connector.removeListener(STATUS.CONNECTING, onConnectingUpdate)
    }
  },

  sendRequest (payload) {
    const connector = initNodeConnector.call(this)

    return connector.request(payload)
  }
}
