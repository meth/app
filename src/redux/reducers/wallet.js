import Immutable from 'immutable'

import { Actions } from '../actions'

const InitialState = Immutable.Map({
  mnemonic: undefined,
  accountBalances: {},
})

export default function (state = InitialState, { type, payload }) {
  switch (type) {
    case Actions.SET_MNEMONIC:
      state = state.set('mnemonic', payload)
      break
    case Actions.ACCOUNT_BALANCES:
      state = state.set('accountBalances', payload)
      break
  }

  return state
}
