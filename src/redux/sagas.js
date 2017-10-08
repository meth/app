import { all, call } from 'redux-saga/effects'

import modals from './modals/sagas'
import config from './config/sagas'

export const createSagas = app => {
  const modalsSaga = modals(app)
  const configSaga = config(app)

  return function* allSagas () {
    yield all([ call(modalsSaga), call(configSaga) ])
  }
}
