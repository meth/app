import Immutable from 'immutable'
import { handleActions } from 'redux-actions'

import { ACCOUNT_BALANCES, ACCOUNT_NAMES } from './actions'

export default () => {
  const InitialState = Immutable.Map({
    accounts: {}
  })

  return handleActions(
    {
      [ACCOUNT_BALANCES]: (state, { payload }) => state.set('accounts', payload),
      [ACCOUNT_NAMES]: (state, { payload: names }) => {
        if (names) {
          const accounts = state.get('accounts')

          Object.keys(accounts).forEach(address => {
            accounts[address].name = names[address]
          })

          return state.set('accounts', [ ...accounts ])
        }

        return state
      }
    },
    InitialState
  )
}
