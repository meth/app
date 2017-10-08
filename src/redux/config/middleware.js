import Q from 'bluebird'

import { INIT } from './actions'
import { mutable } from '../utils'

// eslint-disable-next-line consistent-return
export default ({ config }) => store => next => async action => {
  if (INIT !== action.type) {
    return next(action)
  }

  const { nodes } = mutable(store.getState())

  // if not initialized then do nothing
  if (!nodes) {
    const payload = await Q.props({
      networks: config.load('networks'),
      nodes: config.load('nodes')
    })

    return next({ ...action, payload })
  }
}
