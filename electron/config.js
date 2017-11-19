const got = require('got')

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
 * @return {Promise}
 */
exports.loadConfig = async fileName => {
  const fileNameExt = (0 > fileName.indexOf('.json')) ? `${fileName}.json` : fileName

  log.info(`Load config: ${fileNameExt}`)

  if (Cache[fileNameExt]) {
    log.trace(`Returning cached config: ${fileNameExt}`)

    return Cache[fileNameExt]
  }

  try {
    // download first
    const json = await got(`https://raw.githubusercontent.com/meth-project/meth-browser/master/config/${fileNameExt}`, {
      json: true,
      timeout: {
        connect: 3000,
        socket: 3000,
        request: 5000
      }
    })

    log.debug(`Returning web config: ${fileNameExt}`)

    Cache[fileNameExt] = json

    return json
  } catch (e1) {
    try {
      /* eslint-disable global-require */
      /* eslint-disable import/no-dynamic-require */
      const json = require(`../config/${fileNameExt}`)
      /* eslint-enable import/no-dynamic-require */
      /* eslint-enable global-require */

      log.debug(`Returning bundled config: ${fileNameExt}`)

      return json
    } catch (e2) {
      log.error('Unable to load config', e2)

      throw new Error(`Unable to load bundled config: ${fileNameExt}`)
    }
  }
}
