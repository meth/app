import Immutable from 'immutable'
import { handleActions } from 'redux-actions'

import { BALANCES, SENDING_TRANSACTION } from './actions'
import { createStateActionMachine } from '../../utils/stateMachines'

export default () => {
  const InitialState = Immutable.Map({
    balances: {},
    [SENDING_TRANSACTION]: createStateActionMachine()
  })

  return handleActions(
    {
      [BALANCES]: (state, { payload }) =>
        state.set('balances', payload)
    },
    InitialState
  )
}
