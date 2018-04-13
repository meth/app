import { createActionCreator } from '../utils'

import { WEB3_REQUEST } from './actions'

export const web3Request = createActionCreator(WEB3_REQUEST, (request, permissions) => ({
  request, permissions
}))
