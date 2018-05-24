import EventEmitter from 'eventemitter3'
import { AppState } from 'react-native'
// import Toast from 'react-native-root-toast'

import setupPlatformEnv from './platform'
import UI_TASKS from '../../common/constants/ipcUiTasks'
import logger from '../logger'

const log = logger.create('env')

const globalEvents = new EventEmitter()

const { openExternalUrl, alert } = setupPlatformEnv({ log, globalEvents })

const toast = msg => {
  // Toast.show(msg, {
  //   duration: Toast.durations.SHORT,
  //   position: Toast.positions.BOTTOM,
  //   shadow: true,
  //   animation: true,
  //   hideOnPress: true,
  //   delay: 0
  // })
}

AppState.addEventListener('change', state => {
  if ('active' === state) {
    globalEvents.emit(UI_TASKS.APP_ACTIVE)
  } else {
    globalEvents.emit(UI_TASKS.APP_INACTIVE)
  }
})

module.exports = {
  ...UI_TASKS,
  globalEvents,
  openExternalUrl,
  alert,
  toast
}
