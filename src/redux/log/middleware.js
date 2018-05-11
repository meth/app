import logger from '../../logger'
import { LOAD_ALERTS } from './actions'
import { createAction } from '../utils'

const log = logger.create('LogMiddleware')

// eslint-disable-next-line consistent-return
export default ({ config }) => () => next => async action => {
  switch (action.type) {
    case LOAD_ALERTS:
      try {
        return next(createAction(action.type, await config.load('alerts')))
      } catch (err) {
        log.warn('Error loading alerts config', err)
      }

      break
    default:
      return next(action)
  }
}
