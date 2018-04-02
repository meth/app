import { WEB3_REQUEST, GENERATE_ADDRESS } from './actions'

export default ({ nodeConnector, walletManager }) => () => next => async action => {
  switch (action.type) {
    case WEB3_REQUEST: {
      const { request, permissions } = action.payload

      return nodeConnector.request(request, { permissions })
    }
    case GENERATE_ADDRESS: {
      return Promise.resolve(walletManager.wallet().generateAddress())
    }
    default: {
      return next(action)
    }
  }
}
