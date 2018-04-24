import { createActionCreator } from '../utils'

import {
  INJECT_ACCOUNT_BALANCES,
  INJECT_ADDRESS_BOOK,
  INJECT_BOOKMARKS,
  INJECT_CUSTOM_TOKENS,
  INJECT_DAPP_PERMISSIONS,
  INJECT_TRANSACTION_HISTORY,
  SAVE_DAPP_PERMISSIONS,
  SAVE_ADDRESS_BOOK_ENTRY,
  DELETE_ADDRESS_BOOK_ENTRY,
  GENERATE_RAW_TX,
  SEND_RAW_TX,
  LOAD_WALLET,
  GENERATE_MNEMONIC,
  SEND_TX,
  CANCEL_TX,
  CHECK_PENDING_TRANSACTIONS,
  FETCH_TOKEN_BALANCE,
  ADD_CUSTOM_TOKEN,
  UPDATE_CUSTOM_TOKEN,
  REMOVE_CUSTOM_TOKEN,
  GENERATE_ACCOUNT,
  FETCH_RECOMMENDED_GAS_LIMIT
} from './actions'

/* wallet loading */
export const generateMnemonic = createActionCreator(GENERATE_MNEMONIC)
export const loadWallet = createActionCreator(LOAD_WALLET)

/* inject data (usually from storage) */
export const injectAccountBalances = createActionCreator(INJECT_ACCOUNT_BALANCES)
export const injectAddressBook = createActionCreator(INJECT_ADDRESS_BOOK)
export const injectBookmarks = createActionCreator(INJECT_BOOKMARKS)
export const injectDappPermissions = createActionCreator(INJECT_DAPP_PERMISSIONS)
export const injectCustomTokens = createActionCreator(INJECT_CUSTOM_TOKENS)
export const injectTransactionHistory = createActionCreator(INJECT_TRANSACTION_HISTORY)

/* save changes for dapps, etc */
export const saveDappPermissions =
  createActionCreator(SAVE_DAPP_PERMISSIONS, (dappId, permissions) => ({
    dappId, permissions
  }))
export const saveAddressBookEntry =
  createActionCreator(SAVE_ADDRESS_BOOK_ENTRY, (address, data) => ({
    address, data
  }))
export const deleteAddressBookEntry =
  createActionCreator(DELETE_ADDRESS_BOOK_ENTRY, address => ({ address }))

/* transactions */
export const sendTransaction = createActionCreator(SEND_TX, tx => ({ tx }))
export const cancelTransaction = createActionCreator(CANCEL_TX)
export const generateRawTransaction = createActionCreator(GENERATE_RAW_TX, tx => ({ tx }))
export const sendRawTransaction = createActionCreator(SEND_RAW_TX)
export const checkPendingTransactions = createActionCreator(CHECK_PENDING_TRANSACTIONS)

/* tokens */
export const fetchTokenBalance =
  createActionCreator(FETCH_TOKEN_BALANCE, (symbol, accountAddress) => ({ symbol, accountAddress }))
export const addCustomToken =
  createActionCreator(ADD_CUSTOM_TOKEN, (symbol, details) => ({ symbol, details }))
export const updateCustomToken =
  createActionCreator(UPDATE_CUSTOM_TOKEN, (symbol, details) => ({ symbol, details }))
export const removeCustomToken =
  createActionCreator(REMOVE_CUSTOM_TOKEN, symbol => ({ symbol }))

/* accounts */
export const generateAccount = createActionCreator(GENERATE_ACCOUNT)

/* gas */
export const fetchRecommendedGasLimit =
  createActionCreator(FETCH_RECOMMENDED_GAS_LIMIT, tx => ({ tx }))
