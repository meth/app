import EventEmitter from 'eventemitter3'

import IPC from '../../common/constants/ipc'
import BACKEND_TASKS from '../../common/constants/ipcBackendTasks'
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

const openExternalUrl = url => {
  window.postMessage(
    {
      ipc: IPC.BACKEND_TASK,
      task: BACKEND_TASKS.OPEN_EXTERNAL_URL,
      params: { url }
    },
    '*'
  )
}

module.exports = {
  ...UI_TASKS,
  globalEvents,
  openExternalUrl
}
