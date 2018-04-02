import { createActionCreator } from '../utils'

import {
  ACCOUNT_BALANCES,
  ADDRESS_BOOK,
  BOOKMARKS,
  DAPP_PERMISSIONS,
  SAVE_DAPP_PERMISSIONS,
  SAVE_ADDRESS_BOOK_ENTRY,
  DELETE_ADDRESS_BOOK_ENTRY,
  GENERATE_RAW_TX,
  SEND_RAW_TX,
  LOAD_WALLET,
  GENERATE_MNEMONIC,
  SEND_TX,
  CANCEL_TX
} from './actions'

/* wallet loading */
export const generateMnemonic = createActionCreator(GENERATE_MNEMONIC)
export const loadWallet = createActionCreator(LOAD_WALLET)

/* setup reducer data */
export const setupAccountBalances = createActionCreator(ACCOUNT_BALANCES)
export const setupAddressBook = createActionCreator(ADDRESS_BOOK)
export const setupBookmarks = createActionCreator(BOOKMARKS)
export const setupDappPermissions = createActionCreator(DAPP_PERMISSIONS)

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
