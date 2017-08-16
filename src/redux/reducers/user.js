import Immutable from 'immutable'

import { Actions } from '../actions'

const InitialState = Immutable.Map({
  mnemonic: undefined,
})

export default function (state = InitialState, { type, payload }) {
  switch (type) {
    case Actions.SET_MNEMONIC:
      state = state.set('mnemonic', payload)
      break
  }

  return state
}
