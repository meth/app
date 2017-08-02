const _ = require('lodash'),
  electron = require('electron'),
  app = electron.app,
  path = require('path'),
  packageJson = require('../package.json')


let CONFIG = {
  mode: 'development',
}

try {
  _.extend(CONFIG, require('./config/appConfig.json'))
} catch (err) {}

const MODE_IS_PRODUCTION = (CONFIG.mode==='production')

const argv = require('yargs')
  .usage('Usage: $0 [Meth options]')
  .option({
    mode: {
      demand: false,
      default: CONFIG.mode,
      describe: 'Runtime mode: development, production',
      requiresArg: true,
      nargs: 1,
      type: 'string',
      group: 'Meth options:',
    },
    loglevel: {
      demand: false,
      default: MODE_IS_PRODUCTION ? 'info' : 'debug',
      describe: 'Minimum logging threshold: trace (all logs), debug, info, warn, error.',
      requiresArg: true,
      nargs: 1,
      type: 'string',
      group: 'Meth options:',
    },
    version: {
      alias: 'v',
      demand: false,
      requiresArg: false,
      nargs: 0,
      describe: 'Display Meth version.',
      type: 'boolean',
      group: 'Meth options:',
    },
  })
  .help('h')
  .alias('h', 'help')
  .parse(process.argv.slice(1))



class Settings {
  constructor () {
    // the only globals permitted (for use in preload scripts)
    global.appConfig = this.appConfig
  }

  get userDataDir() {
    // Application Support/Meth
    return app.getPath('userData')
  }

  get logLevel () {
    return argv.loglevel
  }

  get appVersion () {
    return packageJson.version
  }

  get appName() {
    return 'Meth'
  }

  get appConfig() {
    return CONFIG
  }

  get inProductionMode() {
    return MODE_IS_PRODUCTION
  }
}

module.exports = new Settings()
