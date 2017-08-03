import Immutable from 'immutable'
import { StateActions } from './actions'
import { createStateActionMachine } from '../../../utils/stateMachines'


const InitialState = {
  app: Immutable.Map({
    initialization: createStateActionMachine(),
  }),
}


export function app (state = InitialState.app, action) {
  switch (action.type) {
    case StateActions.INIT:
      state = state.set('initialization',
        state.get('initialization').update(action)
      )
      break
  }

  return state
}
