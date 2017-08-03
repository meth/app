const _ = require('lodash'),
  electron = require('electron'),
  app = electron.app,
  ipc = electron.ipcMain,
  EventEmitter = require('eventemitter3'),
  { IPC } = require('../common/constants'),
  Windows = require('./windows'),
  log = require('./logger').create('IpcManager');




class IpcManager {
  constructor () {
    ipc.on(IPC.BACKEND_TASK, this._receiveIpcFromUi.bind(this));
  }

  _receiveIpcFromUi (e, task, params) {
    switch (task) {
      case IPC.BACKEND_TASKS.INIT:
        log.info('Initialize backend ...');
        break;
      default:
        log.error(`Unrecognized task: ${task}`)
    }
  }


  _notifyUi (task, status, data) {
    Windows.getByType('Main').send(IPC.UI_TASK_NOTIFY, task, status, data);
  }
}


module.exports = new IpcManager();
