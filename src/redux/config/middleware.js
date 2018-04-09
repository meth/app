import { openExternalUrl } from '../../env'
import { LOAD_CONFIG, OPEN_EXTERNAL_URL } from './actions'
import { getStore } from '../'

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
    default:
      return next(action)
  }
}
