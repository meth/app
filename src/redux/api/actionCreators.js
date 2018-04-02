import API from '../../../common/constants/api'
import { createActionCreator } from '../utils'

import { GENERATE_ADDRESS, WEB3_REQUEST } from './actions'

export const web3Request = createActionCreator(WEB3_REQUEST, (request, permissions) => ({
  request, permissions
}))

export const generateAddress = createActionCreator(GENERATE_ADDRESS)

exports[API.GENERATE_ADDRESS] = generateAddress
exports[API.LABEL_ADDRESS] = generateAddress
