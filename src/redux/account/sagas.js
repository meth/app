import { put, takeLatest } from 'redux-saga/effects'

import { LOAD_WALLET, SEND_RAW_TX, TX_COMPLETED } from './actions'
import { createAction } from '../utils'
import { getStore } from '../'


function* onLoadWallet ({ storage }, { payload: mnemonic }) {
  yield storage.setMnemonic(mnemonic)
}

function* onSuccessfulTransaction (_, { payload: receipt }) {
  const { selectors: { getTxDeferred } } = getStore()

  // resolve the tx promise so that the original caller gets a tx receipt
  const deferred = getTxDeferred()
  if (deferred) {
    deferred.resolve(receipt)
  }

  yield put(createAction(TX_COMPLETED))
}

export default app => function* saga () {
  yield takeLatest(LOAD_WALLET, onLoadWallet, app)
  yield takeLatest(SEND_RAW_TX, onSuccessfulTransaction, app)
}

export const _privateFunctions = {
  onLoadWallet,
  onSuccessfulTransaction
}
