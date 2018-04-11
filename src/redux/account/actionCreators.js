import { createActionCreator } from '../utils'

import {
  ACCOUNT_BALANCES,
  ADDRESS_BOOK,
  BOOKMARKS,
  LOAD_CUSTOM_TOKENS,
  DAPP_PERMISSIONS,
  SAVE_DAPP_PERMISSIONS,
  SAVE_ADDRESS_BOOK_ENTRY,
  DELETE_ADDRESS_BOOK_ENTRY,
  GENERATE_RAW_TX,
  SEND_RAW_TX,
  LOAD_WALLET,
  GENERATE_MNEMONIC,
  SEND_TX,
  CANCEL_TX,
  TOKEN_BALANCE,
  ADD_CUSTOM_TOKEN,
  UPDATE_CUSTOM_TOKEN,
  REMOVE_CUSTOM_TOKEN
} from './actions'

/* wallet loading */
export const generateMnemonic = createActionCreator(GENERATE_MNEMONIC)
export const loadWallet = createActionCreator(LOAD_WALLET)

/* setup reducer data */
export const setupAccountBalances = createActionCreator(ACCOUNT_BALANCES)
export const setupAddressBook = createActionCreator(ADDRESS_BOOK)
export const setupBookmarks = createActionCreator(BOOKMARKS)
export const setupDappPermissions = createActionCreator(DAPP_PERMISSIONS)
export const setupCustomTokens = createActionCreator(LOAD_CUSTOM_TOKENS)

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
export const generateRawTransaction = createActionCreator(GENERATE_RAW_TX)
export const sendRawTransaction = createActionCreator(SEND_RAW_TX)

/* tokens */
export const loadTokenBalance =
  createActionCreator(TOKEN_BALANCE, (symbol, accountAddress) => ({ symbol, accountAddress }))
export const addCustomToken =
  createActionCreator(ADD_CUSTOM_TOKEN, (symbol, details) => ({ symbol, details }))
export const updateCustomToken =
  createActionCreator(UPDATE_CUSTOM_TOKEN, (symbol, details) => ({ symbol, details }))
export const removeCustomToken =
  createActionCreator(REMOVE_CUSTOM_TOKEN, symbol => ({ symbol }))
