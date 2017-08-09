import Q from 'bluebird'
import { Actions } from '../../actions'
import MODALS from '../../../utils/modals'
import { load as loadConfig } from '../../../config'

module.exports = async function () {
  const { nodes } = this._getState('config')

  if (!nodes) {
    this.modals.show(MODALS.CONNECT_NODE)

    this._action(Actions.CONFIG, await Q.props({
      networks: loadConfig('networks'),
      nodes: loadConfig('nodes')
    }))
  }
}
