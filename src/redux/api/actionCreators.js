import { createAction } from 'redux-actions'

import { GENERATE_ACCOUNT, WEB3_REQUEST, FINALIZE_TRANSACTION } from './actions'

export const web3Request = createAction(WEB3_REQUEST)

export const generateAccount = createAction(GENERATE_ACCOUNT)

export const finalizeTransaction = createAction(FINALIZE_TRANSACTION)
