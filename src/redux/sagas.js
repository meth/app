import { all, call } from 'redux-saga/effects'

import api from './api/sagas'
import modals from './modals/sagas'
import config from './config/sagas'

export const createSagas = app => {
  const apiSaga = api(app)
  const modalsSaga = modals(app)
  const configSaga = config(app)

  return function* allSagas () {
    yield all([ call(apiSaga), call(modalsSaga), call(configSaga) ])
  }
}
