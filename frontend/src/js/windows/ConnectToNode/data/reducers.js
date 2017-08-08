import Immutable from 'immutable'
import { Actions } from './actions'


const InitialState = {
  app: Immutable.Map({
    nodes: {},
    error: null,
  }),
}


export function app (state = InitialState.app, { type, payload }) {
  switch (type) {
    case Actions.NODES:
      state = state.set('nodes', payload)
      break
    case Actions.ERROR:
      state = state.set('error', payload)
      break
  }

  return state
}
