import { WEB3_REQUEST } from './actions'

export default ({ nodeConnector }) => () => next => async action => {
  switch (action.type) {
    case WEB3_REQUEST: {
      const { request, permissions } = action.payload

      return nodeConnector.request(request, { permissions })
    }
    default: {
      return next(action)
    }
  }
}
