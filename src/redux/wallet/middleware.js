import { SEND_RAW_TX, GENERATE_RAW_TX } from './actions'
import { createAction } from '../utils'

// eslint-disable-next-line consistent-return
export default ({ nodeConnector }) => () => next => async action => {
  switch (action.type) {
    case GENERATE_RAW_TX: {
      return Promise.resolve('0xdeadbeef')
    }
    case SEND_RAW_TX: {
      const rawTx = action.payload

      const receipt =
        await nodeConnector.rawCall('eth_sendRawTransaction', [ rawTx ])

      await next(createAction(action.type, receipt))

      return Promise.resolve(receipt)
    }
    default: {
      return next(action)
    }
  }
}
