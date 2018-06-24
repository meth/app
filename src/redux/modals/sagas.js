import { put, takeLatest } from 'redux-saga/effects'

import { NODE_DISCONNECTED } from '../node/actions'
import { SEND_TX, CANCEL_TX, SIGN_DATA, CANCEL_SIGN_DATA } from '../account/actions'
import {
  showConnectionModal,
  showSendTransactionModal,
  hideSendTransactionModal,
  showSignDataModal,
  hideSignDataModal
} from './actionCreators'

function* onSendTransaction () {
  yield put(showSendTransactionModal())
}

function* onCancelTransaction () {
  yield put(hideSendTransactionModal())
}

function* onSignData () {
  yield put(showSignDataModal())
}

function* onCancelSignData () {
  yield put(hideSignDataModal())
}

function* onNodeDisconnected () {
  yield put(showConnectionModal())
}

export default app => function* saga () {
  yield takeLatest(SEND_TX, onSendTransaction, app)
  yield takeLatest(CANCEL_TX, onCancelTransaction, app)
  yield takeLatest(SIGN_DATA, onSignData, app)
  yield takeLatest(CANCEL_SIGN_DATA, onCancelSignData, app)
  yield takeLatest(NODE_DISCONNECTED, onNodeDisconnected, app)
}

export const _privateFunctions = {
  onSendTransaction,
  onCancelTransaction,
  onNodeDisconnected
}
