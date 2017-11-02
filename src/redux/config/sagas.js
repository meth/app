import { takeLatest, call } from 'redux-saga/effects'

import { LOAD_CONFIG } from './actions'

// eslint-disable-next-line require-yield
function* onLoadConfig ({ nodeConnector }, { payload: { networks } }) {
  yield call([ nodeConnector, 'setNetworks' ], networks)
}

export default app => function* saga () {
  yield takeLatest(LOAD_CONFIG, onLoadConfig, app)
}

export const _privateFunctions = {
  onLoadConfig
}
