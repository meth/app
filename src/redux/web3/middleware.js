import { REQUEST } from './actions'

export default ({ nodeConnector }) => () => next => async action => {
  if (REQUEST !== action.type) {
    return next(action)
  }

  return nodeConnector.request(action.payload)
}
