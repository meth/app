import { IPC, BACKEND_TASKS } from '../../../../../../common/constants'
import { StateActions } from './actions'
import { buildAction } from '../../../utils/actions'
import { inProgress } from '../../../utils/stateMachines'

/**
 * Action dispatcher.
 */
class Dispatcher {
  constructor () {
    window.addEventListener('ipc', this._receivedIpcFromBackend.bind(this))
  }

  setStore (store) {
    this._dispatch = store.dispatch
    this._getState = (name) => store.getState()[name].toObject()
  }

  init () {
    this._stateAction(StateActions.INIT, inProgress)
    this._runBackendTask(BACKEND_TASKS.INIT)
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

  _runBackendTask (task, params) {
    window.postMessage({ ipc: IPC.BACKEND_TASK, task, params }, '*')
  }

  _receivedIpcFromBackend (e) {
    const { detail: { task, status, data } } = e

    console.debug(`Recv IPC: task:${task} status:${status} data:${JSON.stringify(data)}`)
  }
}


exports.Dispatcher = new Dispatcher()
