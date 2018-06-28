import _ from 'lodash'
import semver from 'semver'

import { openExternalUrl } from '../../env'
import {
  LOAD_CONFIG,
  OPEN_EXTERNAL_URL,
  FETCH_SAFE_GAS_PRICE,
  CHECK_FOR_UPDATE
} from './actions'
import { loadJSON } from '../../utils/fetch'
import { getStore } from '../'
import logger from '../../logger'
import { getBackendUrl, getAppVersion } from '../../config'
import { getOsName } from '../../utils/deviceInfo'
import { showUpdateAvailableModal } from '../modals/actionCreators'

// eslint-disable-next-line consistent-return
export default ({ config }) => () => next => async action => {
  switch (action.type) {
    case LOAD_CONFIG: {
      const { selectors: { getNodes } } = getStore()

      const existingNodes = getNodes()

      // if not already initialized then do it
      if (!existingNodes) {
        const [ networks, nodes, tokens ] = await Promise.all([
          config.load('networks'),
          config.load('nodes'),
          config.load('tokens')
        ])

        return next({ ...action, payload: { networks, nodes, tokens } })
      }

      break
    }
    case OPEN_EXTERNAL_URL: {
      const { url } = action.payload

      return openExternalUrl(url)
    }
    case FETCH_SAFE_GAS_PRICE: {
      try {
        const data = loadJSON('https://ethgasstation.info/json/predictTable.json')

        // the lowest possible is the first one where >50% of miners accepted it
        let lowest = data.find(({ hashpower_accepting: h }) => h > 50)

        if (!lowest) {
          lowest = data.pop()
        }

        return lowest.gasprice
      } catch (err) {
        throw new Error(`Error fetching safe gas price: ${err}`)
      }
    }
    case CHECK_FOR_UPDATE: {
      try {
        const data = await loadJSON(`${getBackendUrl()}/appUpdates`)

        const osName = getOsName()

        const newVersion = _.get(data, `${osName}.version`)
        const updateUrl = _.get(data, `${osName}.updateUrl`)

        if (newVersion && updateUrl) {
          if (semver.gt(newVersion, getAppVersion())) {
            return next(showUpdateAvailableModal(newVersion, updateUrl))
          }
        } else {
          logger.warn('Unable to extract app update info')
        }
      } catch (err) {
        logger.warn('Error fetching app update info', err.toString())
      }

      return null
    }
    default:
      return next(action)
  }
}
