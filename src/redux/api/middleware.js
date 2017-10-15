import { WEB3_REQUEST, GENERATE_ACCOUNT, FINALIZE_TRANSACTION } from './actions'

export default ({ nodeConnector, walletManager }) => () => next => async action => {
  switch (action.type) {
    case WEB3_REQUEST: {
      return nodeConnector.request(action.payload)
    }
    case FINALIZE_TRANSACTION: {
      throw new Error('Test error')
    }
    case GENERATE_ACCOUNT: {
      return Promise.resolve(walletManager.wallet().generateAccount())
    }
    default: {
      return next(action)
    }
  }
}
