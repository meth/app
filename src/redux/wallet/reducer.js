import Immutable from 'immutable'
import { handleActions } from 'redux-actions'

import { BALANCES, TX_SENDING, TX_SEND_ERROR, TX_SENT, CANCEL_TX } from './actions'
import { SEND_TX_EVENT } from '../../utils/asyncEvents'
import { createStateActionMachine, inProgress, success, error } from '../../utils/stateMachines'

export default () => {
  const InitialState = Immutable.Map({
    [SEND_TX_EVENT]: createStateActionMachine(),
    balances: {},
    currentTransaction: null
  })

  return handleActions(
    {
      [BALANCES]: (state, { payload }) => state.set('balances', payload),
      [TX_SENDING]: (state, { payload: { tx, promise } }) => (
        state
          .set('currentTransaction', tx)
          .set('currentTransactionPromise', promise)
          .set(SEND_TX_EVENT, state.get(SEND_TX_EVENT).update({
            state: inProgress
          }))
      ),
      [TX_SENT]: (state, { payload: data }) => (
        state
          .set('currentTransaction', null)
          .set('currentTransactionPromise', null)
          .set(SEND_TX_EVENT, state.get(SEND_TX_EVENT).update({
            state: success,
            data
          }))
      ),
      [TX_SEND_ERROR]: (state, { payload: data }) => (
        state
          .set('currentTransaction', null)
          .set('currentTransactionPromise', null)
          .set(SEND_TX_EVENT, state.get(SEND_TX_EVENT).update({
            state: error,
            data
          }))
      ),
      [CANCEL_TX]: (state, { payload: data }) => (
        state
          .set('currentTransaction', null)
          .set('currentTransactionPromise', null)
          .set(SEND_TX_EVENT, state.get(SEND_TX_EVENT).update({
            state: error,
            data
          }))
      )
    },
    InitialState
  )
}
