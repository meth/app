import { createAction } from 'redux-actions'

import { GENERATE_ACCOUNT, WEB3_REQUEST } from './actions'

export const web3Request = createAction(WEB3_REQUEST)

export const generateAccount = createAction(GENERATE_ACCOUNT)
