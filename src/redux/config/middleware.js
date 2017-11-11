import { LOAD_CONFIG } from './actions'
import { getNodes } from './selectors'

// eslint-disable-next-line consistent-return
export default ({ config }) => store => next => async action => {
  if (LOAD_CONFIG !== action.type) {
    return next(action)
  }

  const existingNodes = getNodes(store.getState())

  // if not already initialized then do it
  if (!existingNodes) {
    const [ networks, nodes ] = await Promise.all([
      config.load('networks'),
      config.load('nodes')
    ])

    return next({ ...action, payload: { networks, nodes } })
  }
}
