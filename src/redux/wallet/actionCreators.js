import { createActionCreator } from '../utils'

import { BALANCES, GENERATE_RAW_TX, SEND_RAW_TX } from './actions'

export const updateBalances = createActionCreator(BALANCES)

export const generateRawTransaction = createActionCreator(GENERATE_RAW_TX)

export const sendRawTransaction = createActionCreator(SEND_RAW_TX)
