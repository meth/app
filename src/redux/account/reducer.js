import Immutable from 'immutable'
import { handleActions } from 'redux-actions'

import { ADDRESS_BALANCES, ADDRESS_NAMES, BOOKMARKS, DAPP_PERMISSIONS } from './actions'

export default () => {
  const InitialState = Immutable.Map({
    addressBalances: {},
    addressNames: {},
    bookmarks: {},
    dappPermissions: {}
  })

  return handleActions(
    {
      [ADDRESS_BALANCES]: (state, { payload }) => state.set('addressBalances', payload),
      [BOOKMARKS]: (state, { payload }) => state.set('bookmarks', payload),
      [DAPP_PERMISSIONS]: (state, { payload }) => state.set('dappPermissions', payload),
      [ADDRESS_NAMES]: (state, { payload: names }) => {
        if (names) {
          return state.set('addressNames', names)
        }

        return state
      }
    },
    InitialState
  )
}
