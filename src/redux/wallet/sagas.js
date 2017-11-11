import { put, takeLatest } from 'redux-saga/effects'

import logger from '../../logger'
import { ACCOUNT_BALANCES, LOAD_WALLET } from './actions'
import { updateAccountNames } from './actionCreators'

const log = logger.create('walletSaga')

function* refreshAccountNames ({ storage }) {
  try {
    const names = yield storage.loadAccountNames()

    yield put(updateAccountNames(names))
  } catch (err) {
    log.warn('Error refreshing account names', err.toString())
  }
}

function* setStorageMnemonic ({ storage }, { payload: mnemonic }) {
  yield storage.setMnemonic(mnemonic)
}

export default app => function* saga () {
  yield takeLatest(LOAD_WALLET, setStorageMnemonic, app)
  yield takeLatest(ACCOUNT_BALANCES, refreshAccountNames, app)
}

export const _privateFunctions = {
  setStorageMnemonic,
  refreshAccountNames
}
