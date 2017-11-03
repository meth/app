import { createActionCreator } from '../utils'

import { BALANCES, GENERATE_RAW_TX, SEND_RAW_TX, LOAD_WALLET, GENERATE_MNEMONIC } from './actions'

export const generateMnemonic = createActionCreator(GENERATE_MNEMONIC)

export const loadWallet = createActionCreator(LOAD_WALLET)

export const updateBalances = createActionCreator(BALANCES)

export const generateRawTransaction = createActionCreator(GENERATE_RAW_TX)

export const sendRawTransaction = createActionCreator(SEND_RAW_TX)
