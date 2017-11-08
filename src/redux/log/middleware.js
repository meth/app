import logger from '../../logger'
import { LOAD_ALERTS } from './actions'

const log = logger.create('LogMiddleware')

// eslint-disable-next-line consistent-return
export default ({ config }) => () => next => async action => {
  switch (action.type) {
    case LOAD_ALERTS:
      try {
        return next({
          ...action,
          payload: await config.load('alerts')
        })
      } catch (err) {
        log.warn('Error loading alerts config', err)
      }

      break
    default:
      return next(action)
  }
}
