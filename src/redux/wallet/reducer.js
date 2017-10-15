import Immutable from 'immutable'
import { handleActions } from 'redux-actions'

import { BALANCES, TX_SENDING, TX_SEND_ERROR, TX_SENT, CANCEL_TX } from './actions'

export default () => {
  const InitialState = Immutable.Map({
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
      ),
      [TX_SENT]: state => (
        state
          .set('currentTransaction', null)
          .set('currentTransactionPromise', null)
      ),
      [TX_SEND_ERROR]: state => (
        state
          .set('currentTransaction', null)
          .set('currentTransactionPromise', null)
      ),
      [CANCEL_TX]: state => (
        state
          .set('currentTransaction', null)
          .set('currentTransactionPromise', null)
      )
    },
    InitialState
  )
}
