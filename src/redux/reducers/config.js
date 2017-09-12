import Immutable from 'immutable'

import { Actions } from '../actions'

const InitialState = Immutable.Map({
  nodes: undefined,
  networks: undefined,
  isConnected: false,
  disconnectReason: undefined
})

export default function(state = InitialState, { type, payload }) {
  let newState = state

  switch (type) {
    case Actions.CONFIG:
      newState = newState.set('nodes', payload.nodes)
      newState = newState.set('networks', payload.networks)
      break

    default:
      break
  }

  return newState
}
