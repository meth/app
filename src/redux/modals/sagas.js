import { put, takeLatest } from 'redux-saga/effects'

import { INIT } from '../config/actions'
import { NODE_DISCONNECTED } from '../node/actions'
import { SEND_TX, CANCEL_TX } from '../api/actions'
import { showConnectionModal, showSendTransactionModal, hideSendTransactionModal } from './actionCreators'

function* onInit () {
  yield put(showConnectionModal())
}

function* onSendTransaction () {
  yield put(showSendTransactionModal())
}

function* onCancelTransaction () {
  yield put(hideSendTransactionModal())
}

function* onNodeDisconnected () {
  yield put(showConnectionModal())
}

export default app => function* saga () {
  yield takeLatest(INIT, onInit, app)
  yield takeLatest(SEND_TX, onSendTransaction, app)
  yield takeLatest(CANCEL_TX, onCancelTransaction, app)
  yield takeLatest(NODE_DISCONNECTED, onNodeDisconnected, app)
}

export const _privateFunctions = {
  onInit,
  onSendTransaction,
  onCancelTransaction,
  onNodeDisconnected
}
