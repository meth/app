import { put, takeLatest } from 'redux-saga/effects'

import { INIT } from '../config/actions'
import { showConnectionModal } from './actionCreators'

export default function* () {
  yield takeLatest(INIT, function* onInit () {
    yield put(showConnectionModal())
  })
}
