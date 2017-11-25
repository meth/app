import { createActionCreator } from '../utils'

import {
  ADDRESS_BALANCES,
  ADDRESS_NAMES,
  BOOKMARKS,
  DAPP_PERMISSIONS,
  SAVE_DAPP_PERMISSIONS,
  GENERATE_RAW_TX,
  SEND_RAW_TX,
  LOAD_WALLET,
  GENERATE_MNEMONIC
} from './actions'

/* wallet loading */
export const generateMnemonic = createActionCreator(GENERATE_MNEMONIC)
export const loadWallet = createActionCreator(LOAD_WALLET)

/* setup reducer data */
export const setupAddressBalances = createActionCreator(ADDRESS_BALANCES)
export const setupAddressNames = createActionCreator(ADDRESS_NAMES)
export const setupBookmarks = createActionCreator(BOOKMARKS)
export const setupDappPermissions = createActionCreator(DAPP_PERMISSIONS)

/* save config for dapps, etc */
export const saveDappPermissions =
  createActionCreator(SAVE_DAPP_PERMISSIONS, (dappId, permissions) => ({
    dappId, permissions
  }))

/* transactions */
export const generateRawTransaction = createActionCreator(GENERATE_RAW_TX)
export const sendRawTransaction = createActionCreator(SEND_RAW_TX)
