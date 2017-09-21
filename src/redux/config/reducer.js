import Immutable from 'immutable'
import { handleActions } from 'redux-actions'

import { INIT } from './actions'

const InitialState = Immutable.Map({
  nodes: undefined,
  networks: undefined,
  isConnected: false,
  disconnectReason: undefined
})

export default handleActions(
  {
    [INIT]: (state, { payload: { nodes, networks } }) =>
      state.set('nodes', nodes).set('networks', networks)
  },
  InitialState
)
