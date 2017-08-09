import Immutable from 'immutable'

import { Actions } from './actions'
import { Router } from '../ui/nav'
import MODALS from '../utils/modals'

const InitialState = {
  nav: Router.getStateForAction(
    Router.getActionForPathAndParams('')
  ),

  config: Immutable.Map({
    nodes: null,
    networks: null,
    isConnected: false,
  }),

  modals: Immutable.Map(Object.keys(MODALS).reduce((m, k) => {
    m[MODALS[k]] = null
    return m
  }, {})),
}



export function nav (state = InitialState.nav, action) {
  const { type } = action

  let nextState

  switch (type) {
    case 'Navigation/RESET':
      const { pathName, params } = action
      nextState = Router.getStateForAction(
        Router.getActionForPathAndParams(pathName, params)
      )
      break
    case 'Navigation/NAVIGATE':
      nextState = Router.getStateForAction(action, state)
      break
  }

  return nextState || state
}


export function config (state = InitialState.config, { type, payload }) {
  switch (type) {
    case Actions.CONFIG:
      state = state.set('nodes', payload.nodes)
      state = state.set('networks', payload.networks)
      break
    case Actions.NODE_CONNECTED:
      state = state.set('isConnected', payload)
      break
  }

  return state
}


export function modals (state = InitialState.modals, { type, payload }) {
  switch (type) {
    case Actions.SHOW_MODAL:
      state = state.set(payload, true)
      break
    case Actions.HIDE_MODAL:
      state = state.set(payload, false)
      break
  }

  return state
}
