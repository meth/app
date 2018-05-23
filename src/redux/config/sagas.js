import { takeLatest, call } from 'redux-saga/effects'

import { LOAD_CONFIG } from './actions'

function* onLoadConfig ({ nodeConnector }, { payload: { networks } }) {
  yield call([ nodeConnector, 'setNetworks' ], networks)
}

export default app => function* saga () {
  yield takeLatest(LOAD_CONFIG, onLoadConfig, app)
}

export const _privateFunctions = {
  onLoadConfig
}
