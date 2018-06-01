import API from '../../../../../common/constants/api'

export default (payload, permissions, apiMethods) =>
  apiMethods[API.WEB3_REQUEST](payload, permissions)
