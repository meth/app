import { takeLatest, call } from 'redux-saga/effects'

import { LOAD_CONFIG, SAVE_PIN } from './actions'
import { getStore } from '../'

function* onLoadConfig ({ nodeConnector }, { payload: { networks } }) {
  yield call([ nodeConnector, 'setNetworks' ], networks)
}

function* onSavePin ({ storage }) {
  const store = getStore()

  yield storage.appSettings.addOrUpdate({
    name: 'pin',
    value: store.selectors.getSecurityPin()
  })
}

export default app => function* saga () {
  yield takeLatest(LOAD_CONFIG, onLoadConfig, app)
  yield takeLatest(SAVE_PIN, onSavePin, app)
}

export const _privateFunctions = {
  onLoadConfig
}
