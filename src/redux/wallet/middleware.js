import { SEND_TX, TX_SEND_ERROR, TX_SENT, CANCEL_TX } from './actions'
import { transactionSending } from './actionCreators'
import { mutable } from '../utils'
import { SendTransactionError } from '../../utils/errors'
import { t } from '../../../common/strings'

// eslint-disable-next-line consistent-return
export default () => store => next => async action => {
  switch (action.type) {
    case SEND_TX: {
      const { wallet: { currentTransaction } } = mutable(store.getState(), 'wallet')

      if (currentTransaction) {
        return Promise.reject(
          new SendTransactionError(t('error.transactionAlreadyInProgress'))
        )
      }

      const sendInfo = {
        tx: action.payload
      }

      const sendPromise = new Promise((resolve, reject) => {
        sendInfo.promise = { resolve, reject }
      })

      store.dispatch(transactionSending(sendInfo))

      return sendPromise
    }
    case TX_SENT: {
      const { wallet: { currentTransactionPromise: promise } } = mutable(store.getState())

      if (promise) {
        promise.resolve(action.payload)
      }

      return next(action)
    }
    case CANCEL_TX:
    case TX_SEND_ERROR: {
      const { wallet: { currentTransactionPromise: promise } } = mutable(store.getState())

      if (promise) {
        promise.reject(action.payload)
      }

      return next(action)
    }
    default: {
      return next(action)
    }
  }
}
