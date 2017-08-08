import Immutable from 'immutable'
import { Actions } from './actions'


const InitialState = {
  app: Immutable.Map({
    nodes: {},
  }),
}


export function app (state = InitialState.app, { type, payload }) {
  switch (type) {
    case Actions.NODES:
      state = state.set('nodes', payload)
      break
  }

  return state
}
