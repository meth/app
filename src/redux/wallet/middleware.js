import { SEND_TX } from './actions'

// eslint-disable-next-line consistent-return
export default () => () => next => async action => {
  if (SEND_TX !== action.type) {
    return next(action)
  }

  // TODO
}
