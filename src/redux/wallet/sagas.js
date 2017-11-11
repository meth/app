import { put, takeLatest } from 'redux-saga/effects'

import { ACCOUNT_BALANCES, LOAD_WALLET } from './actions'
import { updateAccountNames } from './actionCreators'

function* refreshAccountNames ({ storage }) {
  const names = yield storage.loadAccountNames()

  yield put(updateAccountNames(names))
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
