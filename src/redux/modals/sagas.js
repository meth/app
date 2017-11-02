import { put, takeLatest } from 'redux-saga/effects'

import { NODE_DISCONNECTED } from '../node/actions'
import { SEND_TX, CANCEL_TX } from '../api/actions'
import { showConnectionModal, showSendTransactionModal, hideSendTransactionModal } from './actionCreators'

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
  yield takeLatest(SEND_TX, onSendTransaction, app)
  yield takeLatest(CANCEL_TX, onCancelTransaction, app)
  yield takeLatest(NODE_DISCONNECTED, onNodeDisconnected, app)
}

export const _privateFunctions = {
  onSendTransaction,
  onCancelTransaction,
  onNodeDisconnected
}
