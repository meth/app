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
    [INIT]: (state, { payload }) => {
      state = state.set('nodes', payload.nodes)
      state = state.set('networks', payload.networks)
      return state
    }
  },
  InitialState
)
