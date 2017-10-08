import logger from '../../utils/log'
import { CONNECT_NODE } from './actions'
import {
  nodeConnecting,
  nodeConnectError,
  nodeConnected
} from './actionCreators'

const log = logger.create('nodeMiddleware')


// eslint-disable-next-line consistent-return
export default ({ nodeConnector }) => store => next => async action => {
  if (CONNECT_NODE !== action.type) {
    return next(action)
  }

  await store.dispatch(nodeConnecting())

  try {
    await store.dispatch(nodeConnected(await nodeConnector.connect(action.payload)))
  } catch (err) {
    log.warn(err)

    await store.dispatch(nodeConnectError(err))

    throw err
  }
}
