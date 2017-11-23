const { ipcMain: ipc } = require('electron')

const BACKEND_TASKS = require('../common/constants/ipcBackendTasks')
const IPC = require('../common/constants/ipc')
const Windows = require('./windows')

const log = require('./logger').create('BackendIpc')


class BackendIpc {
  constructor () {
    ipc.on(IPC.BACKEND_TASK, this._receiveIpcFromUi.bind(this))
  }

  _receiveIpcFromUi ({ sender }, task) {
    switch (task) {
      case BACKEND_TASKS.SET_WINDOW_ID:
        log.info(`Task: Set window id: ${sender.id}`)
        Windows.getMainWindow().setId(sender.id)
        break

      default:
        log.error(`Unrecognized task: ${task}`)
    }
  }
}


module.exports = BackendIpc
