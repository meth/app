const { app, ipcMain: ipc } = require('electron'),
  EventEmitter = require('eventemitter3')

const _ = require('./underscore'),
  NodeConnector = require('./nodeConnector'),
  Windows = require('./windows'),
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
        Windows.setWindowIdFromIpcSender(sender)
        break

      case BACKEND_TASKS.INIT:
        log.info('Task: Initialize backend...')

        NodeConnector.init().catch(err => {
          log.error('Error initializing node connector', err)
        })

        break

      case BACKEND_TASKS.CONNECT_TO_NODE:
        log.info('Task: Connect to node...')

        NodeConnector.handleIpcFromUi(params)

        break

      default:
        log.error(`Unrecognized task: ${task}`)
    }
  }

  notifyAllUis (task, status, data) {
    log.debug(`Send UI task to all windows: ${task}, ${status}`)

    Windows.broadcast(IPC.UI_TASK_NOTIFY, task, status, data)
  }

  notifyUi (wnd, task, status, data) {
    log.debug(`Send UI task to window ${wnd.id}: ${task}, ${status}`)

    wnd.send(IPC.UI_TASK_NOTIFY, task, status, data)
  }
}


module.exports = BackendIpc
