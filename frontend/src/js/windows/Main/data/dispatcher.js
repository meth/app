import DispatcherBase from '../../../utils/dispatcher'
import { BACKEND_TASKS } from '../../../../../../common/constants'
import { StateActions } from './actions'
import { inProgress } from '../../../utils/stateMachines'

/**
 * Action dispatcher.
 */
class Dispatcher extends DispatcherBase {
  init () {
    this._stateAction(StateActions.INIT, inProgress)
    this._runBackendTask(BACKEND_TASKS.INIT)
  }
}


export default new Dispatcher()
