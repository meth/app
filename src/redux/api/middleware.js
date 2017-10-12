import { WEB3_REQUEST, GENERATE_ACCOUNT } from './actions'

export default ({ nodeConnector, walletManager }) => () => next => async action => {
  switch (action.type) {
    case WEB3_REQUEST: {
      return nodeConnector.request(action.payload)
    }
    case GENERATE_ACCOUNT: {
      return Promise.resolve(walletManager.wallet().generateAccount())
    }
    default: {
      return next(action)
    }
  }
}
