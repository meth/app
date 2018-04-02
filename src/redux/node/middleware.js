import logger from '../../logger'
import { CONNECT_NODE, DISCONNECT_NODE } from './actions'
import { getStore } from '../'

const log = logger.create('nodeMiddleware')


// eslint-disable-next-line consistent-return
export default ({ nodeConnector }) => () => next => async action => {
  const {
    actions: {
      nodeConnecting,
      nodeConnectError,
      nodeConnected
    }
  } = getStore()

  switch (action.type) {
    case DISCONNECT_NODE: {
      log.debug('Disconnect from node ...')

      await nodeConnector.disconnect()

      break
    }
    case CONNECT_NODE: {
      log.debug('Connect to node ...')

      await nodeConnecting()

      try {
        const node = action.payload

        const network = await nodeConnector.connect(node)

        await nodeConnected({ node, network })
      } catch (err) {
        log.warn(err)

        await nodeConnectError(err)

        throw err
      }

      break
    }
    default: {
      return next(action)
    }
  }
}
