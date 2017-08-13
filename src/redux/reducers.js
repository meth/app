import Immutable from 'immutable'

import { Actions, StateActions } from './actions'
import { success, createStateActionMachine } from '../utils/stateMachines'
import { Router } from '../ui/nav'
import MODALS from '../utils/modals'

const InitialState = {
  nav: Router.getStateForAction(
    Router.getActionForPathAndParams('')
  ),

  config: Immutable.Map({
    nodes: null,
    networks: null,
  }),

  node: Immutable.Map({
    [StateActions.CONNECT_NODE]: createStateActionMachine(),
    isConnected: false,
    disconnectReason: null,
    genesisBlock: null,
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
    case Actions.RECONNECT_NODE:
      state = state.set('isConnected', false)
      state = state.set('disconnectReason', payload)
      break
  }

  return state
}


export function node (state = InitialState.node, { type, payload }) {
  switch (type) {
    case StateActions.CONNECT_NODE:
      const machine = state.get(StateActions.CONNECT_NODE).update({ payload })

      state = state.set(StateActions.CONNECT_NODE, machine)

      // in success state we expect to have genesis block info
      if (success === machine.getState()) {
        state = state.set('genesisBlock', machine.getData())
      }

      break

    case Actions.NODE_DISCONNECTED:
      state = InitialState.node
      break
  }

  return state
}


export function modals (state = InitialState.modals, { type, payload }) {
  switch (type) {
    case Actions.NODE_DISCONNECTED:
      state = state.set(MODALS.CONNECT_NODE, true)
      break

    case Actions.SHOW_MODAL:
      state = state.set(payload, true)
      break
    case Actions.HIDE_MODAL:
      state = state.set(payload, false)
      break
  }

  return state
}
