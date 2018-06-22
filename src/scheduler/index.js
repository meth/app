import EventEmitter from 'eventemitter3'

import logger from '../logger'
import { globalEvents } from '../env'
import UI_TASKS from '../../common/constants/ipcUiTasks'
import { isMobile } from '../utils/deviceInfo'

const log = logger.create('Scheduler')

class Scheduler extends EventEmitter {
  constructor () {
    super()

    this._jobs = []
    this._running = false

    // on mobile we pause the scheduler when app is inactive
    if (isMobile) {
      globalEvents.on(UI_TASKS.APP_ACTIVE, this.start)
      globalEvents.on(UI_TASKS.APP_INACTIVE, this.stop)
    }
  }

  addJob (name, interval, callback) {
    log.info(`Add job ${name} to run every ${interval} seconds`)

    this._jobs.push({
      name,
      callback,
      intervalMs: interval * 1000,
      lastRun: 0
    })

    this.start()

    return this._jobs.length - 1
  }

  removeJob (id) {
    const { name } = this._jobs[id]

    log.info(`Remove job ${name}`)

    this._jobs.splice(id, 0)
  }

  start = () => {
    if (!this._running) {
      log.info('Start scheduler ...')

      this._running = true
      this._processJobs()
    }
  }

  stop = () => {
    if (this._running) {
      log.info('Stop scheduler ...')

      this._running = false
      clearTimeout(this._timer)
    }
  }

  _processJobs = () => {
    if (!this._running) {
      return
    }

    let i = 0

    while (this._jobs.length > i) {
      const job = this._jobs[i]
      const { name, lastRun, intervalMs, callback } = job
      const now = Date.now()

      if (now - lastRun >= intervalMs) {
        log.debug(`Running job ${name} ...`)

        job.lastRun = now

        callback()
      }

      i += 1
    }

    // check every second
    this._timer = setTimeout(this._processJobs, 1000)
  }
}

export default new Scheduler()
