import Immutable from 'immutable'

import { Actions } from '../actions'

const InitialState = Immutable.Map({
  mnemonic: undefined,
  accountBalances: {},
  sendTransaction: null
})

export default function (state = InitialState, { type, payload }) {
  let newState = state

  switch (type) {
    case Actions.SET_MNEMONIC:
      newState = newState.set('mnemonic', payload)
      break

    case Actions.ACCOUNT_BALANCES:
      newState = newState.set('accountBalances', payload)
      break

    case Actions.SEND_TRANSACTION:
      newState = newState.set('sendTransaction', payload)
      break

    default:
      break
  }

  return newState
}
