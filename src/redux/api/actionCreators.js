import { createActionCreator } from '../utils'

import { GENERATE_ACCOUNT, WEB3_REQUEST, SEND_TX, CANCEL_TX } from './actions'

export const web3Request = createActionCreator(WEB3_REQUEST)

export const generateAccount = createActionCreator(GENERATE_ACCOUNT)

export const sendTransaction = createActionCreator(SEND_TX, tx => ({ tx }))

export const cancelTransaction = createActionCreator(CANCEL_TX)
