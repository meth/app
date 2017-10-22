import Q from 'bluebird'

import { INIT } from './actions'
import { getNodes } from './selectors'

// eslint-disable-next-line consistent-return
export default ({ config }) => store => next => async action => {
  if (INIT !== action.type) {
    return next(action)
  }

  const nodes = getNodes(store.getState())

  // if not initialized then do nothing
  if (!nodes) {
    const payload = await Q.props({
      networks: config.load('networks'),
      nodes: config.load('nodes')
    })

    return next({ ...action, payload })
  }
}
