import { takeLatest, call } from 'redux-saga/effects'

import { INIT } from './actions'

// eslint-disable-next-line require-yield
function* onInit ({ nodeConnector }, { payload: { networks } }) {
  yield call([ nodeConnector, 'setNetworks' ], networks)
}

export default app => function* saga () {
  yield takeLatest(INIT, onInit, app)
}

export const _privateFunctions = {
  onInit
}
