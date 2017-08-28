const { ipcMain: ipc } = require('electron')

const Windows = require('./windows'),
  log = require('./logger').create('BackendIpc')

const {
  IPC,
  BACKEND_TASKS,
} = require('../common/constants')



class BackendIpc {
  constructor () {
    ipc.on(IPC.BACKEND_TASK, this._receiveIpcFromUi.bind(this))
  }

  _receiveIpcFromUi ({ sender }, task, params) {
    switch (task) {
      case BACKEND_TASKS.SET_WINDOW_ID:
        log.info(`Task: Set window id: ${sender.id}`)
        Windows.getMainWindow().setId(sender.id)
        break

      default:
        log.error(`Unrecognized task: ${task}`)
    }
  }

  notifyMainUi (task, status, data) {
    log.debug(`Send UI task to window: ${task}, ${status}`)

    Windows.getMainWindow().send(IPC.UI_TASK_NOTIFY, task, status, data)
  }
}


module.exports = BackendIpc
