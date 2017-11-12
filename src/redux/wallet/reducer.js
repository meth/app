import Immutable from 'immutable'
import { handleActions } from 'redux-actions'

import { ACCOUNTS, ACCOUNT_NAMES } from './actions'

export default () => {
  const InitialState = Immutable.Map({
    accounts: {},
    accountNames: {},
    bookmarks: {},
    dappPermissions: {}
  })

  return handleActions(
    {
      [ACCOUNTS]: (state, { payload }) => state.set('accounts', payload),
      [ACCOUNT_NAMES]: (state, { payload: names }) => {
        if (names) {
          return state.set('accountNames', names)
        }

        return state
      }
    },
    InitialState
  )
}
