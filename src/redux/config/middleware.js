import Q from 'bluebird'

import { LOAD_CONFIG } from './actions'
import { getNodes } from './selectors'

// eslint-disable-next-line consistent-return
export default ({ config }) => store => next => async action => {
  if (LOAD_CONFIG !== action.type) {
    return next(action)
  }

  const nodes = getNodes(store.getState())

  // if not already initialized then do it
  if (!nodes) {
    const payload = await Q.props({
      networks: config.load('networks'),
      nodes: config.load('nodes')
    })

    return next({ ...action, payload })
  }
}
