import logger from '../../logger'
import { CONNECT_NODE, DISCONNECT_NODE } from './actions'
import {
  nodeConnecting,
  nodeConnectError,
  nodeConnected
} from './actionCreators'

const log = logger.create('nodeMiddleware')


// eslint-disable-next-line consistent-return
export default ({ nodeConnector }) => store => next => async action => {
  switch (action.type) {
    case DISCONNECT_NODE: {
      log.debug('Disconnect from node ...')

      await nodeConnector.disconnect()

      break
    }
    case CONNECT_NODE: {
      log.debug('Connect to node ...')

      await store.dispatch(nodeConnecting())

      try {
        const node = action.payload

        const network = await nodeConnector.connect(node)

        await store.dispatch(nodeConnected({ node, network }))
      } catch (err) {
        log.warn(err)

        await store.dispatch(nodeConnectError(err))

        throw err
      }

      break
    }
    default: {
      return next(action)
    }
  }
}
