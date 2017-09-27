import { NODE_IS_CONNECTING } from './actions'
import {
  connectNodeInProgress,
  connectNodeError,
  connectNodeSuccess
} from './actionCreators'
import { ready } from '../../utils/stateMachines'
import NodeConnector from '../../nodeConnector'

// eslint-disable-next-line consistent-return
export default () => store => next => async action => {
  if (NODE_IS_CONNECTING !== action.type) {
    return next(action)
  }

  const { state, data } = action.payload

  if (ready !== state) {
    return next(action)
  }

  store.dispatch(connectNodeInProgress())

  try {
    store.dispatch(connectNodeSuccess(await NodeConnector.connect(data)))
  } catch (err) {
    store.dispatch(connectNodeError(err))

    throw err
  }
}
