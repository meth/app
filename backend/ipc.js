const _ = require('lodash'),
  electron = require('electron'),
  app = electron.app,
  ipc = electron.ipcMain,
  EventEmitter = require('eventemitter3'),
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

        const ev = new EventEmitter()

        const wnd = Windows.getByIpcSender(e.sender)

        ev.on(EVENT.CONNECTING, () => {
          this._sendToFrontend(wnd, BACKEND_TASKS.CONNECT_TO_NODE, EVENT.CONNECTING)
        })

        ev.on(EVENT.CONNECTED, () => {
          this._sendToFrontend(wnd, BACKEND_TASKS.CONNECT_TO_NODE, EVENT.CONNECTED)
        })

        this._sendToFrontend(wnd, BACKEND_TASKS.CONNECT_TO_NODE, EVENT.CONNECTED)
        break

      default:
        log.error(`Unrecognized task: ${task}`)
    }
  }

  _sendToFrontend (wnd, task, status, data) {
    log.debug(`Send UI task to ${wnd.id}, ${task}, ${status}`)

    wnd.send(IPC.UI_TASK_NOTIFY, task, status, data);
  }
}


module.exports = new BackendIpc();
