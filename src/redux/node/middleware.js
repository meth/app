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
    },
    selectors: {
      getNodesAsFlatList
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
        const node = getNodesAsFlatList().find(({ id }) => id === action.payload)

        if (!node) {
          throw new Error('Node not found')
        }

        const network = await nodeConnector.connect(node)

        await nodeConnected({ node, network })
      } catch (err) {
        log.warn(err.message)

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
