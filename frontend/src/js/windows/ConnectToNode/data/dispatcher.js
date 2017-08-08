import DispatcherBase from '../../../utils/dispatcher'
import { STATUS, BACKEND_TASKS } from '../../../../../../common/constants'
import { Actions } from './actions'

const { CONNECT_TO_NODE } = BACKEND_TASKS


/**
 * Action dispatcher.
 */
class Dispatcher extends DispatcherBase {
  init () {
    this._runBackendTask(CONNECT_TO_NODE, STATUS.PREPARE)
  }

  _handleIpcFromBackend (task, status, data) {
    if (CONNECT_TO_NODE === task) {
      switch (status) {
        case STATUS.PREPARE:
          this._action(Actions.NODES, data)
          break
        case STATUS.ERROR:
          this._action(Actions.ERROR, data)
          break
      }
    }
  }
}


export default new Dispatcher()
