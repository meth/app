import Immutable from 'immutable'
import { handleActions } from 'redux-actions'

import {
  ACCOUNT_BALANCES,
  ACCOUNT_FRIENDLY_NAMES,
  BOOKMARKS,
  DAPP_PERMISSIONS,
  SAVE_DAPP_PERMISSIONS
} from './actions'

export default () => {
  const InitialState = Immutable.Map({
    accountBalances: {},
    accountFriendlyNames: {},
    bookmarks: {},
    dappPermissions: {}
  })

  return handleActions(
    {
      [ACCOUNT_BALANCES]: (state, { payload }) => state.set('accountBalances', payload),
      [BOOKMARKS]: (state, { payload }) => state.set('bookmarks', payload),
      [DAPP_PERMISSIONS]: (state, { payload }) => state.set('dappPermissions', payload),
      [SAVE_DAPP_PERMISSIONS]: (state, { payload: { dappId, permissions } }) =>
        state.set('dappPermissions', {
          ...state.get('dappPermissions'),
          [dappId]: permissions
        }),
      [ACCOUNT_FRIENDLY_NAMES]: (state, { payload: names }) => {
        if (names) {
          return state.set('accountFriendlyNames', names)
        }

        return state
      }
    },
    InitialState
  )
}
