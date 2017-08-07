import DispatcherBase from '../../../utils/dispatcher'
import { STATUS, BACKEND_TASKS } from '../../../../../../common/constants'
import { Actions } from './actions'

const { CONNECT_TO_NODE } = BACKEND_TASKS


/**
 * Action dispatcher.
 */
class Dispatcher extends DispatcherBase {
  _handleIpcFromBackend (task, status, data) {
    if (CONNECT_TO_NODE === task) {
      switch (status) {
        case STATUS.PREPARE:
          this._action(Actions.NODES)
          break
      }
    }
  }
}


export default new Dispatcher()
