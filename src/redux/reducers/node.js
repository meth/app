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
  switch (type) {
    case StateActions.CONNECT_NODE:
      const machine = state.get(StateActions.CONNECT_NODE).update({ payload })

      state = state.set(StateActions.CONNECT_NODE, machine)

      // in success state we expect to have genesis block info
      if (success === machine.getState()) {
        state = state.set('genesisBlock', machine.getData())
        state = state.set('isConnected', payload)
      }

      break
    case Actions.NODE_DISCONNECTED:
      state = state.set('isConnected', false)
      state = state.set('disconnectReason', payload)
      break
  }

  return state
}
