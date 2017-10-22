import { SEND_RAW_TX, GENERATE_RAW_TX } from './actions'
import { createAction } from '../utils'

// eslint-disable-next-line consistent-return
export default () => () => next => async action => {
  switch (action.type) {
    case GENERATE_RAW_TX: {
      return Promise.resolve('0xdeadbeef')
    }
    case SEND_RAW_TX: {
      const receipt = 123

      await next(createAction(action.type, receipt))

      return Promise.resolve(receipt)
    }
    default: {
      return next(action)
    }
  }
}
