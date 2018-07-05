import { loadJSON } from '../utils/fetch'
import alerts from './alerts.json'
import networks from './networks.json'
import nodes from './nodes.json'
import tokens from './tokens.json'
import logger from '../logger'

const log = logger.create('config')

const BUNDLES = { alerts, networks, nodes, tokens }

const CACHE = {}

/**
 * Load config file
 *
 * This will first attempt to download the latest version from the project
 * Github repo. If fails or not found then it will use the bundled version.
 *
 * Results from this are cached, so that the next call finishes quicker.
 *
 * @param  {String} fileName name of config file
 * @param  {Boolean} [skipCache] don't use previously cached version of file
 * @return {Promise}
 */
export const load = async (fileName, skipCache = false) => {
  log.info(`Load config: ${fileName}`)

  if (CACHE[fileName] && !skipCache) {
    log.trace(`Returning cached config: ${fileName}`)

    return CACHE[fileName]
  }

  try {
    // download first
    const json = await loadJSON(
      `https://raw.githubusercontent.com/meth-project/meth-browser/master/src/config/${fileName}.json`
    )

    log.debug(`Returning web config: ${fileName}`)

    CACHE[fileName] = json
  } catch (e1) {
    if (!BUNDLES[fileName]) {
      throw new Error(`Unable to load bundled config: ${fileName}`)
    }

    log.debug(`Returning bundled config: ${fileName}`)

    CACHE[fileName] = BUNDLES[fileName]
  }

  return CACHE[fileName]
}

const LOCAL_CONFIG = Object.assign(
  {},
  require('../../buildConfig.json')
)

export const getBackendUrl = () => LOCAL_CONFIG.backend
export const getAppName = () => LOCAL_CONFIG.appName
export const getAppVersion = () => LOCAL_CONFIG.appVersion
