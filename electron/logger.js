const chalk = require('chalk')
const Logger = require('logarama')
const Settings = require('./settings')

const colorMap = {
  trace: 'gray',
  debug: 'magenta',
  info: 'white',
  error: 'redBright',
  warn: 'yellow'
}

module.exports = new Logger('Meth-Backend', {
  minLevel: Settings.logLevel,
  output: (level, tag, msg) => {
    // eslint-disable-next-line no-console
    console.log(chalk[colorMap[level]](`${tag}: ${msg}`))
  }
})
