import { SEND_TX, CANCEL_TX, WEB3_REQUEST, GENERATE_ACCOUNT } from './actions'
import { createAction } from '../utils'
import { SendTransactionError } from '../../utils/errors'
import { t } from '../../../common/strings'
import { getTxDeferred } from './selectors'


export default ({ nodeConnector, walletManager }) => store => next => async action => {
  switch (action.type) {
    case WEB3_REQUEST: {
      return nodeConnector.request(action.payload)
    }
    case GENERATE_ACCOUNT: {
      return Promise.resolve(walletManager.wallet().generateAccount())
    }
    case SEND_TX: {
      const existingDeferred = getTxDeferred(store.getState())

      if (existingDeferred) {
        return Promise.reject(
          new SendTransactionError(t('error.transactionAlreadyInProgress'))
        )
      }

      let deferred = null

      const promise = new Promise((resolve, reject) => {
        deferred = { resolve, reject }
      })

      await next(createAction(SEND_TX, {
        ...action.payload,
        deferred
      }))

      // we return a promise which the caller can wait on to know if/when the
      // tx passes/fails
      return promise
    }
    case CANCEL_TX: {
      const deferred = getTxDeferred(store.getState())

      if (deferred) {
        deferred.reject(action.payload)
      }

      return next(action)
    }
    default: {
      return next(action)
    }
  }
}
