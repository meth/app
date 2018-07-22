import EventEmitter from 'eventemitter3'

import logger from '../logger'
import { globalEvents } from '../env'
import UI_TASKS from '../../common/constants/ipcUiTasks'
import { isMobile } from '../utils/deviceInfo'
import { randStr } from '../utils/string'

const log = logger.create('Scheduler')

const _idn = (id, name) => `${name} (${id})`

class Scheduler extends EventEmitter {
  constructor () {
    super()

    this._jobs = {}
    this._running = false

    // on mobile we pause the scheduler when app is inactive
    if (isMobile()) {
      globalEvents.on(UI_TASKS.APP_ACTIVE, this.start)
      globalEvents.on(UI_TASKS.APP_INACTIVE, this.stop)
    }
  }

  addJob (name, interval, callback) {
    const id = randStr(5)

    log.info(`Add job ${_idn(id, name)} to run every ${interval} seconds`)

    this._jobs[id] = {
      name,
      callback,
      intervalMs: interval * 1000,
      lastRun: 0
    }

    this.start()

    return id
  }

  removeJob (id) {
    const { name } = this._jobs[id]

    log.info(`Remove job ${_idn(id, name)}`)

    delete this._jobs[id]
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

    Object.keys(this._jobs).forEach(id => {
      const job = this._jobs[id]
      const { name, lastRun, intervalMs, callback } = job
      const now = Date.now()

      if (now - lastRun >= intervalMs) {
        log.debug(`Running job ${_idn(id, name)} ...`)

        job.lastRun = now

        callback()
      }
    })

    // check every second
    this._timer = setTimeout(this._processJobs, 1000)
  }
}

export default new Scheduler()
