import { all, call } from 'redux-saga/effects'

import modalsSagas from './modals/sagas'
import configSagas from './config/sagas'

export default function* () {
  yield all([ call(modalsSagas), call(configSagas) ])
}
