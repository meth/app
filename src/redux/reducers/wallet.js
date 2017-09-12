import Immutable from 'immutable'

import { Actions } from '../actions'

const InitialState = Immutable.Map({
  mnemonic: undefined,
  accountBalances: {},
  sendTransaction: null
})

export default function(state = InitialState, { type, payload }) {
  switch (type) {
    case Actions.SET_MNEMONIC:
      state = state.set('mnemonic', payload)
      break
    case Actions.ACCOUNT_BALANCES:
      state = state.set('accountBalances', payload)
      break
    case Actions.SEND_TRANSACTION:
      state = state.set('sendTransaction', payload)
      break
  }

  return state
}
