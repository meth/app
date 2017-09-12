import Immutable from 'immutable'

import { Actions, StateActions } from '../actions'
import { success, createStateActionMachine } from '../../utils/stateMachines'

const InitialState = Immutable.Map({
  [StateActions.CONNECT_NODE]: createStateActionMachine(),
  isConnected: false,
  disconnectReason: undefined,
  genesisBlock: null
})

export default function(state = InitialState, { type, payload }) {
  let newState = state

  const machine = newState.get(StateActions.CONNECT_NODE)

  switch (type) {
    case StateActions.CONNECT_NODE:
      machine.update({ payload })
      newState = newState.set(StateActions.CONNECT_NODE, machine)
      // in success newState we expect to have genesis block info
      if (success === machine.getState()) {
        newState = newState.set('genesisBlock', machine.getData())
        newState = newState.set('isConnected', payload)
      }
      break

    case Actions.NODE_DISCONNECTED:
      newState = newState.set('isConnected', false)
      newState = newState.set('disconnectReason', payload)
      break

    default:
      break
  }

  return newState
}
