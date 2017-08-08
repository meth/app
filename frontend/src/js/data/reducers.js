import Immutable from 'immutable'

import { Actions } from './actions'
import { Router, NavActions } from '../ui/nav'

const InitialState = {
  nav: Router.getStateForAction(
    Router.getActionForPathAndParams('')
  ),
  config: Immutable.Map({
    nodes: {},
  }),
}

export function nav (state = InitialState.nav, action) {
  const { type } = action

  let nextState

  switch (type) {
    case 'Navigation/RESET':
    case 'Navigation/NAVIGATE':
      nextState = Router.getStateForAction(action, state)
      break
    case 'Navigation/BACK':
      nextState = Router.getStateForAction(
        NavActions.back(),
        state
      )
      break
  }

  return nextState || state
}


export function config (state = InitialState.config, { type, payload }) {
  switch (type) {
    case Actions.NODES:
      state = state.set('nodes', payload)
      break
  }

  return state
}
