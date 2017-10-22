import { put, call, select, takeLatest } from 'redux-saga/effects'

import { SEND_RAW_TX } from '../wallet/actions'
import { TX_COMPLETED } from './actions'
import { createAction } from '../utils'
import { getTxDeferred } from './selectors'

function* onSuccessfulTransaction (app, { payload: receipt }) {
  // resolve the tx promise so that the original caller gets a tx receipt
  const deferred = yield call(select, getTxDeferred)
  if (deferred) {
    deferred.resolve(receipt)
  }

  yield put(createAction(TX_COMPLETED))
}

export default app => function* saga () {
  yield takeLatest(SEND_RAW_TX, onSuccessfulTransaction, app)
}

export const _privateFunctions = {
  onSuccessfulTransaction
}
