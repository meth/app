const { app } = require('electron')
const path = require('path')

const _ = require('./lodash')
const packageJson = require('../package.json')


const CONFIG = {
  mode: 'development'
}

try {
  /* eslint-disable global-require */
  /* eslint-disable import/no-unresolved */
  _.extend(CONFIG, require('../appConfig.json'))
  /* eslint-enable global-require */
  /* eslint-enable import/no-unresolved */
} catch (err) {
  // do nothing!
}

const MODE_IS_PRODUCTION = ('production' === CONFIG.mode)

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
      group: 'Meth options:'
    },
    loglevel: {
      demand: false,
      default: MODE_IS_PRODUCTION ? 'info' : 'debug',
      describe: 'Minimum logging threshold: trace (all logs), debug, info, warn, error.',
      requiresArg: true,
      nargs: 1,
      type: 'string',
      group: 'Meth options:'
    },
    version: {
      alias: 'v',
      demand: false,
      requiresArg: false,
      nargs: 0,
      describe: 'Display Meth version.',
      type: 'boolean',
      group: 'Meth options:'
    }
  })
  .help('h')
  .alias('h', 'help')
  .parse(process.argv.slice(1))



class Settings {
  constructor () {
    // the only globals permitted (for use in preload scripts)
    global.appConfig = this.appConfig
  }

  get userDataDir () {
    // Application Support/Meth
    return app.getPath('userData')
  }

  get appWebDir () {
    return path.resolve(path.join(app.getAppPath(), 'build', 'web'))
  }

  get logLevel () {
    return argv.loglevel
  }

  get appVersion () {
    return packageJson.version
  }

  get appName () {
    return 'Meth'
  }

  get appConfig () {
    return CONFIG
  }

  get inProductionMode () {
    return MODE_IS_PRODUCTION
  }

  get preloadBasePath () {
    return path.resolve(path.join(__dirname, 'preload'))
  }
}

module.exports = new Settings()
