import Immutable from 'immutable'

import { Actions } from '../actions'

const InitialState = Immutable.Map({
  nodes: undefined,
  networks: undefined,
  isConnected: false,
  disconnectReason: undefined,
})

export default function (state = InitialState, { type, payload }) {
  switch (type) {
    case Actions.CONFIG:
      state = state.set('nodes', payload.nodes)
      state = state.set('networks', payload.networks)
      break
  }

  return state
}
