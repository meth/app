import { LOAD_CONFIG } from './actions'
import { getStore } from '../'

// eslint-disable-next-line consistent-return
export default ({ config }) => () => next => async action => {
  if (LOAD_CONFIG !== action.type) {
    return next(action)
  }

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
}
