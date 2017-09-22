import { put, takeLatest } from 'redux-saga/effects'

import { INIT } from '../config/actions'
import { showConnectionModal } from './actionCreators'

function* onInit () {
  yield put(showConnectionModal())
}

export default function* saga () {
  yield takeLatest(INIT, onInit)
}

export const _privateFunctions = {
  onInit
}
