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
      [SEND_TX]: (state, { payload: { tx, deferred } }) => (
        state
          .set('currentTx', tx)
          .set('currentTxDeferred', deferred)
      ),
      [CANCEL_TX]: state => state.set('currentTxDeferred', null),
      [TX_COMPLETED]: state => state.set('currentTxDeferred', null)
    },
    InitialState
  )
}
