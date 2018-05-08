import _ from 'lodash'
import { put, takeLatest } from 'redux-saga/effects'

import {
  LOAD_WALLET,
  SEND_RAW_TX,
  TX_FLOW_COMPLETED,
  CHECK_PENDING_TRANSACTIONS,
  SAVE_DAPP_PERMISSIONS,
  SAVE_ADDRESS_BOOK_ENTRY,
  DELETE_ADDRESS_BOOK_ENTRY,
  ADD_CUSTOM_TOKEN,
  UPDATE_CUSTOM_TOKEN,
  REMOVE_CUSTOM_TOKEN
} from './actions'
import { createAction } from '../utils'
import { getStore } from '../'


function* onLoadWallet ({ storage }, { payload: mnemonic }) {
  yield storage.setMnemonic(mnemonic)
}

function* onTransactionSent (__, { payload: { id, params } }) {
  const { selectors: { getTxDeferred } } = getStore()

  // resolve the tx promise so that the original caller gets a tx receipt
  const deferred = getTxDeferred()
  if (deferred) {
    deferred.resolve(id)
  }

  yield put(createAction(TX_FLOW_COMPLETED, {
    id,
    params: _.omit(params, 'data') // remove heavy params
  }))
}

function* onTransactionFlowCompleted ({ storage }, { payload: { id } }) {
  const { selectors: { getTransactionHistory } } = getStore()

  const tx = getTransactionHistory().find(({ id: txId }) => txId === id)

  yield storage.transactions.addOrUpdate(tx)
}

function* onCheckedPendingTransactions ({ storage }, { payload }) {
  yield Promise.all(
    payload.map(tx => storage.transactions.addOrUpdate(tx))
  )
}

function* onUpdateDappPermissions ({ storage }) {
  const { selectors: { getDappPermissions } } = getStore()

  yield storage.saveDappPermissions(getDappPermissions())
}

function* onSaveAddressBookEntry ({ storage }, { payload: { address } }) {
  const { selectors: { getAddressBook } } = getStore()

  const entry = getAddressBook()[address]

  yield storage.addressBook.addOrUpdate({
    ...entry,
    address
  })
}

function* onDeleteAddressBookEntry ({ storage }, { payload: { address } }) {
  yield storage.addressBook.remove(address)
}

function* onAddCustomToken ({ storage }, { payload: { symbol, details } }) {
  yield storage.customTokens.addOrUpdate({
    ...details,
    symbol
  })
}

function* onUpdateCustomToken ({ storage }, { payload: { symbol, details } }) {
  yield storage.customTokens.addOrUpdate({
    ...details,
    symbol
  })
}

function* onRemoveCustomToken ({ storage }, { payload: { symbol } }) {
  yield storage.customTokens.remove(symbol)
}

export default app => function* saga () {
  yield takeLatest(LOAD_WALLET, onLoadWallet, app)
  yield takeLatest(SEND_RAW_TX, onTransactionSent, app)
  yield takeLatest(TX_FLOW_COMPLETED, onTransactionFlowCompleted, app)
  yield takeLatest(CHECK_PENDING_TRANSACTIONS, onCheckedPendingTransactions, app)
  yield takeLatest(SAVE_DAPP_PERMISSIONS, onUpdateDappPermissions, app)
  yield takeLatest(SAVE_ADDRESS_BOOK_ENTRY, onSaveAddressBookEntry, app)
  yield takeLatest(DELETE_ADDRESS_BOOK_ENTRY, onDeleteAddressBookEntry, app)
  yield takeLatest(ADD_CUSTOM_TOKEN, onAddCustomToken, app)
  yield takeLatest(UPDATE_CUSTOM_TOKEN, onUpdateCustomToken, app)
  yield takeLatest(REMOVE_CUSTOM_TOKEN, onRemoveCustomToken, app)
}

export const _privateFunctions = {
}
