import { REQUEST } from './actions'
import NodeConnector from '../../nodeConnector'

export default () => () => next => async action => {
  if (REQUEST !== action.type) {
    return next(action)
  }

  return NodeConnector.request(action.payload)
}
