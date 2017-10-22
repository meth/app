import Immutable from 'immutable'
import { handleActions } from 'redux-actions'

import { SEND_TX, CANCEL_TX, TX_COMPLETED } from './actions'

export default () => {
  const InitialState = Immutable.Map({
    currentTx: null,
    currentTxDeferred: null
  })

  return handleActions(
    {
      [SEND_TX]: (state, { payload: { tx, promise } }) => (
        state
          .set('currentTx', tx)
          .set('currentTxDeferred', promise)
      ),
      [CANCEL_TX]: state => (
        state
          .set('currentTx', null)
          .set('currentTxDeferred', null)
      ),
      [TX_COMPLETED]: state => (
        state
          .set('currentTx', null)
          .set('currentTxDeferred', null)
      )
    },
    InitialState
  )
}
