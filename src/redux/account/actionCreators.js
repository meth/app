import { createActionCreator } from '../utils'

import {
  ADDRESS_BALANCES,
  ADDRESS_NAMES,
  BOOKMARKS,
  DAPP_PERMISSIONS,
  GENERATE_RAW_TX,
  SEND_RAW_TX,
  LOAD_WALLET,
  GENERATE_MNEMONIC
} from './actions'

export const generateMnemonic = createActionCreator(GENERATE_MNEMONIC)

export const loadWallet = createActionCreator(LOAD_WALLET)

export const updateAddressBalances = createActionCreator(ADDRESS_BALANCES)

export const updateAddressNames = createActionCreator(ADDRESS_NAMES)

export const updateBookmarks = createActionCreator(BOOKMARKS)

export const updateDappPermissions = createActionCreator(DAPP_PERMISSIONS)

export const generateRawTransaction = createActionCreator(GENERATE_RAW_TX)

export const sendRawTransaction = createActionCreator(SEND_RAW_TX)
