import { takeLatest, call } from 'redux-saga/effects'

import { INIT } from './actions'
import NodeConnector from '../../nodeConnector'

// eslint-disable-next-line require-yield
function* onInit ({ payload: { networks } }) {
  yield call([ NodeConnector, 'setNetworks' ], networks)
}

export default function* saga () {
  yield takeLatest(INIT, onInit)
}

export const _privateFunctions = {
  onInit
}
