import Immutable from 'immutable'
import { handleActions } from 'redux-actions'

import { INIT } from './actions'

export default () => {
  const InitialState = Immutable.Map({
    nodes: undefined,
    networks: undefined,
    isConnected: false,
    disconnectReason: undefined
  })

  return handleActions(
    {
      [INIT]: (state, { payload: { nodes, networks } }) =>
        state.set('nodes', nodes).set('networks', networks)
    },
    InitialState
  )
}
