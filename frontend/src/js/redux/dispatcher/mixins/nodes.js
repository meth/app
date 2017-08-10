import { STATUS } from '../../../../../../common/constants'
import { Actions, StateActions } from '../../actions'
import { inProgress, success, error } from '../../../utils/stateMachines'
import NodeConnector from '../../../nodeConnector'

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
  connect: async function (nodeConfig) {
    this._log.info('Connecting to node...')

    this._stateAction(StateActions.CONNECT_NODE, inProgress)

    const connector = initNodeConnector.call(this)

    try {
      await connector.connect(nodeConfig)

      this._log.info('Node connection succeeded!')

      this._stateAction(StateActions.CONNECT_NODE, success)
    } catch (err) {
      this._log.warn('Node connection failed', err)

      this._stateAction(StateActions.CONNECT_NODE, error, err.toString())
    }
  },
}
