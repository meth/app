import { takeLatest } from 'redux-saga/effects'

import { LOAD_WALLET } from './actions'

function* onLoadWallet ({ storage }, { payload: mnemonic }) {
  yield storage.setMnemonic(mnemonic)
}

export default app => function* saga () {
  yield takeLatest(LOAD_WALLET, onLoadWallet, app)
}

export const _privateFunctions = {
  onLoadWallet
}
