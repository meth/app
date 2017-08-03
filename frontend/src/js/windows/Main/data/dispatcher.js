import { IPC } from '../../../../../../common/constants'
import { StateActions } from './actions'
import { buildAction } from '../../../utils/actions'
import { inProgress } from '../../../utils/stateMachines'

/**
 * Action dispatcher.
 */
class Dispatcher {
  // constructor () {
    // window.ipc.on(IPC.UI_TASK_NOTIFY, this._receivedIpcFromBackend.bind(this))
    // window.ipc.on(IPC.UI_RELOAD, () => window.location.reload())
  // }
  setStore (store) {
    this._dispatch = store.dispatch
    this._getState = (name) => store.getState()[name].toObject()
  }

  init () {
    this._stateAction(StateActions.INIT, inProgress)
    this._sendIpcToBackend(IPC.BACKEND_TASKS.INIT)
  }

  _action (type, payload) {
    this._dispatch(buildAction(type, payload))
  }

  _stateAction (type, state, data) {
    if (typeof state !== 'string') {
      throw new Error('State must be a string')
    }

    this._dispatch(buildAction(type, {
      state: state,
      data: data,
    }))
  }

  _sendIpcToBackend (task, params) {
    window.postMessage({ ipc: IPC.BACKEND_TASK, task, params }, '*')
  }

  _receivedIpcFromBackend (e, task, state, data) {
    console.debug(`Recv IPC: task:${task} state:${state} data:${typeof data}`)
  }
}


exports.Dispatcher = new Dispatcher()
