import { NODE_IS_CONNECTING } from './actions'
import {
  connectNodeInProgress,
  connectNodeError,
  connectNodeSuccess
} from './actionCreators'
import { ready } from '../../utils/stateMachines'

// eslint-disable-next-line consistent-return
export default ({ nodeConnector }) => store => next => async action => {
  if (NODE_IS_CONNECTING !== action.type) {
    return next(action)
  }

  const { state, data } = action.payload

  if (ready !== state) {
    return next(action)
  }

  await store.dispatch(connectNodeInProgress())

  try {
    await store.dispatch(connectNodeSuccess(await nodeConnector.connect(data)))
  } catch (err) {
    await store.dispatch(connectNodeError(err))

    throw err
  }
}
