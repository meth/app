import { createActionCreator } from '../utils'
import API from '../../../common/constants/api'
import { WEB3_REQUEST } from './actions'

exports[API.WEB3_REQUEST] = createActionCreator(WEB3_REQUEST, (request, permissions) => ({
  request, permissions
}))
