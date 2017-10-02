import { createAction } from 'redux-actions'

import { BALANCES, SEND_TX } from './actions'

export const updateBalances = createAction(BALANCES)

export const sendTransaction = createAction(SEND_TX)
