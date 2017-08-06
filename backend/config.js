const _ = require('lodash'),
  got = require('got'),
  Q = require('bluebird'),
  path = require('path')

const log = require('./logger').create('ConfigLoader')


const Cache = {}

/**
 * Load given JSON config file.
 *
 * This will first attempt to download the latest version from the project
 * Github repo. If fails or not found then it will use the bundled version.
 *
 * Results from this are cached, so that the next call finishes quicker.
 *
 * @param  {String} fileName relative to `config` folder, without extension.
 * @return {Promise}          [description]
 */
exports.loadConfig = Q.method(fileName => {
  fileName = `${fileName}.json`

  log.info(`Load config: ${fileName}`)

  if (Cache[fileName]) {
    log.trace(`Returning cached config: ${fileName}`)

    return Cache[fileName]
  }

  // download first
  return got(`https://raw.githubusercontent.com/meth-project/meth-browser/master/config/${fileName}`, {
    json: true,
    timeout: {
      connect: 3000,
      socket: 3000,
      request: 5000,
    },
  })
  .then(json => {
    log.debug(`Returning web config: ${fileName}`)

    Cache[fileName] = json

    return json
  })
  .catch(err => {
    try {
      const json = require(path.join(__dirname, '..', 'config', `${fileName}.json`))

      log.debug(`Returning bundled config: ${fileName}`)

      return json
    } catch (e) {
      throw new Error(`Config file not found: ${fileName}`)
    }
  })
})
