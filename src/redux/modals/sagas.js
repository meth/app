import { put, takeLatest } from 'redux-saga/effects'

import { INIT } from '../config/actions'
import { NODE_DISCONNECTED } from '../node/actions'
import { TX_SENDING } from '../wallet/actions'
import { showConnectionModal, showSendTransactionModal } from './actionCreators'

function* onInit () {
  yield put(showConnectionModal())
}

function* onSendTransaction () {
  yield put(showSendTransactionModal())
}

function* onNodeDisconnected () {
  yield put(showConnectionModal())
}

export default app => function* saga () {
  yield takeLatest(INIT, onInit, app)
  yield takeLatest(TX_SENDING, onSendTransaction, app)
  yield takeLatest(NODE_DISCONNECTED, onNodeDisconnected, app)
}

export const _privateFunctions = {
  onInit,
  onSendTransaction,
  onNodeDisconnected
}
