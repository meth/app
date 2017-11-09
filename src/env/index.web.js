import EventEmitter from 'eventemitter3'

import IPC from '../constants/ipc'
import UI_TASKS from '../constants/ipc-ui-tasks'
import logger from '../logger'

const log = logger.create('config')

export default UI_TASKS

class GlobalEvents extends EventEmitter {}
export const globalEvents = new GlobalEvents()

window.addEventListener(IPC.UI_TASK, ({ task, data }) => {
  log.debug('Recieved UI task IPC command', task)

  globalEvents.emit(task, data)
})
