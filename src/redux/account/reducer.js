import Immutable from 'immutable'
import { handleActions } from 'redux-actions'

import { ADDRESSES, ADDRESS_NAMES } from './actions'

export default () => {
  const InitialState = Immutable.Map({
    addresses: {},
    addressNames: {},
    bookmarks: {},
    dappPermissions: {}
  })

  return handleActions(
    {
      [ADDRESSES]: (state, { payload }) => state.set('addresses', payload),
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
