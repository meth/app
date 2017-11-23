import EventEmitter from 'eventemitter3'

import IPC from '../../common/constants/ipc'
import UI_TASKS from '../../common/constants/ipcUiTasks'
import logger from '../logger'

const log = logger.create('config')

const globalEvents = new EventEmitter()

if (typeof window !== 'undefined') {
  window.addEventListener(IPC.UI_TASK, ({ detail: { task, data } }) => {
    log.debug('Recieved UI task IPC command', task)

    globalEvents.emit(task, data)
  })
}

module.exports = {
  ...UI_TASKS,
  globalEvents
}
