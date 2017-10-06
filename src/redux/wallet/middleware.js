import { SENDING_TRANSACTION } from './actions'
import { inProgress, ready } from '../../utils/stateMachines'

// eslint-disable-next-line consistent-return
export default () => store => next => async action => {
  if (SENDING_TRANSACTION !== action.type) {
    return next(action)
  }

  const { state: txState } = action.payload

  const { wallet: { [SENDING_TRANSACTION]: sendTx } } = store.getStateObject()

  // if a transaction is already being sent do nothing
  if (inProgress === sendTx.getState()) {
    return Promise.resolve()
  }

  // if it's a new transaction then mark it as in progress
  if (ready === txState) {
    // mark the transaction as being in progress
    return next({
      ...action,
      payload: {
        ...action.payload,
        state: inProgress
      }
    })
  }
}
