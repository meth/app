import EventEmitter from 'eventemitter3'

import setupPlatformEnv from './platform'
import UI_TASKS from '../../common/constants/ipcUiTasks'
import logger from '../logger'

const log = logger.create('env')

const globalEvents = new EventEmitter()

const { openExternalUrl, alertUser } = setupPlatformEnv({ log, globalEvents })

module.exports = {
  ...UI_TASKS,
  globalEvents,
  openExternalUrl,
  alertUser
}
