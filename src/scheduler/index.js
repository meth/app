import EventEmitter from 'eventemitter3'

import logger from '../logger'

const log = logger.create('Scheduler')

class Scheduler extends EventEmitter {
  constructor () {
    super()

    this._jobs = []

    this.start()
  }

  addJob (name, interval, callback) {
    log.info(`Add job ${name} to run every ${interval} seconds`)

    this._jobs.push({
      name,
      callback,
      intervalMs: interval * 1000,
      lastRun: 0
    })

    return this._jobs.length - 1
  }

  removeJob (id) {
    const { name } = this._jobs[id]

    log.info(`Remove job ${name}`)

    this._jobs.splice(id, 0)
  }

  start () {
    log.info('Start scheduler ...')

    this._timer = setInterval(this._processJobs.bind(this), 1000)
  }

  stop () {
    log.info('Stop scheduler ...')

    clearInterval(this._timer)
  }

  _processJobs () {
    let i = 0

    while (this._jobs > i) {
      const { name, lastRun, intervalMs, callback } = this._jobs[i]
      const now = Date.now()

      if (now - lastRun === intervalMs) {
        log.info(`Running job ${name} ...`)

        this._jobs[i].lastRun = now

        callback()
      }

      i += 1
    }
  }
}

export default new Scheduler()
