import { createActionCreator } from '../utils'

import {
  ACCOUNT_BALANCES,
  ACCOUNT_NAMES,
  GENERATE_RAW_TX,
  SEND_RAW_TX,
  LOAD_WALLET,
  GENERATE_MNEMONIC
} from './actions'

export const generateMnemonic = createActionCreator(GENERATE_MNEMONIC)

export const loadWallet = createActionCreator(LOAD_WALLET)

export const updateAccountBalances = createActionCreator(ACCOUNT_BALANCES)

export const updateAccountNames = createActionCreator(ACCOUNT_NAMES)

export const generateRawTransaction = createActionCreator(GENERATE_RAW_TX)

export const sendRawTransaction = createActionCreator(SEND_RAW_TX)
