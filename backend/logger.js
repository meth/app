const chalk = require('chalk'),
  Logger = require('logarama'),
  Settings = require('./settings')

const colorMap = {
  trace: 'gray',
  debug: 'magenta',
  info: 'white',
  error: 'redBright',
  warn: 'yellow',
}

module.exports = new Logger('Meth-Backend', {
  minLevel: Settings.logLevel,
  output: (level, tag, msg) => {
    console.log(chalk[colorMap[level]](`${tag}: ${msg}`))
  }
})
