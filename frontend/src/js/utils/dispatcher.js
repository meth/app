import { IPC, BACKEND_TASKS } from '../../../../common/constants'
import { buildAction } from './actions'

/**
 * Action dispatcher.
 */
export default class Dispatcher {
  constructor () {
    window.addEventListener('ipc', (e) => {
      const { detail: { task, status, data } } = e

      console.debug(`Recv IPC: task:${task} status:${status} data:${JSON.stringify(data)}`)

      this._handleIpcFromBackend(task, status, data)
    })
  }

  setStore (store) {
    this._dispatch = store.dispatch
    this._getState = (name) => store.getState()[name].toObject()
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

  _handleIpcFromBackend (task, status, data) {
    // override in subclass
  }
}
