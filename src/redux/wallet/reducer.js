import Immutable from 'immutable'
import { handleActions } from 'redux-actions'

import { BALANCES } from './actions'

export default () => {
  const InitialState = Immutable.Map({
    balances: {}
  })

  return handleActions(
    {
      [BALANCES]: (state, { payload }) => state.set('balances', payload)
    },
    InitialState
  )
}
