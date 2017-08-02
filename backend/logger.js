const Logger = require('logarama'),
  Settings = require('./settings')

const log = new Logger('meth', {
  minLevel: Settings.logLevel,
  output: (level, tag, msg) => {
    console[level](`${tag}: ${msg}`)
  }
})

export default log
