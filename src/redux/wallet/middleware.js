import { SEND_RAW_TX, GENERATE_RAW_TX } from './actions'

// eslint-disable-next-line consistent-return
export default () => () => next => async action => {
  switch (action.type) {
    case GENERATE_RAW_TX: {
      return Promise.resolve('0xdeadbeef')
    }
    case SEND_RAW_TX: {
      return Promise.resolve('ok!')
    }
    default: {
      return next(action)
    }
  }
}
