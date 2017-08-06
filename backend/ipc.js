const _ = require('lodash'),
  electron = require('electron'),
  app = electron.app,
  ipc = electron.ipcMain,
  EventEmitter = require('eventemitter3'),
  NodeConnector = require('./NodeConnector'),
  { IPC, BACKEND_TASKS, EVENT } = require('../common/constants'),
  Windows = require('./windows'),
  log = require('./logger').create('BackendIpc');




class BackendIpc {
  constructor () {
    ipc.on(IPC.BACKEND_TASK, this._receiveIpcFromUi.bind(this));
  }

  _receiveIpcFromUi (e, task, params) {
    switch (task) {
      case BACKEND_TASKS.SET_WINDOW_ID:
        log.info(`Window intialized with id: ${e.sender.id}`)
        Windows.setWindowIdFromIpcSender(e.sender)
        break

      case BACKEND_TASKS.INIT:
        log.info('Initialize backend...');

        NodeConnector.init()

        break

      default:
        log.error(`Unrecognized task: ${task}`)
    }
  }

  notifyAllUis (task, status, data) {
    log.debug(`Send UI task to all windows, ${task}, ${status}`)

    wnd.send(IPC.UI_TASK_NOTIFY, task, status, data);
  }
}


module.exports = new BackendIpc();
