import _ from 'lodash'
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

  document.onkeydown = event => {
    const evt = event || window.event
    const key = _.get(evt, 'key', '000').toLowerCase().substr(0, 3)
    if ('esc' === key || 27 === evt.keyCode) {
      globalEvents.emit(UI_TASKS.ESCAPE)
    }
  }
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

const alertUser = msg => {
  /* eslint-disable no-console */
  console.error(msg)
  /* eslint-disable no-alert */
  window.alert(msg)
}

module.exports = {
  ...UI_TASKS,
  globalEvents,
  openExternalUrl,
  alertUser
}
