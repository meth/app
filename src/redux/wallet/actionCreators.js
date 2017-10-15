import { createAction } from 'redux-actions'

import { BALANCES, SEND_TX, TX_SENDING, TX_SENT, TX_SEND_ERROR, CANCEL_TX } from './actions'

export const updateBalances = createAction(BALANCES)

export const sendTransaction = createAction(SEND_TX)

export const cancelTransaction = createAction(CANCEL_TX)

export const transactionSending = createAction(TX_SENDING)

export const transactionSent = createAction(TX_SENT)

export const transactionSendError = createAction(TX_SEND_ERROR)
