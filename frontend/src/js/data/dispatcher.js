import { IPC, BACKEND_TASKS, STATUS } from '../../../../common/constants'
import { buildAction, Actions } from './actions'
import { inProgress } from '../utils/stateMachines'




/**
 * Action dispatcher base
 */
class Dispatcher {
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

  init () {
    this._action(Actions.INIT, inProgress)
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

  _handleIpcFromBackend (task, status, data) {
    if (BACKEND_TASKS.CONNECT_TO_NODE === task) {
      switch (status) {
        case STATUS.PREPARE:
          this._action(Actions.NODES, data)
          break
        case STATUS.ERROR:
          // TODO: show node selector dialog again
          break
      }
    }
  }
}



export default new Dispatcher()
