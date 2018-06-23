import logger from '../../logger'
import { LOAD_ALERTS } from './actions'
import { createAction } from '../utils'
import { LEVELS } from '../../../common/constants/log'

const { ALERT } = LEVELS

const log = logger.create('LogMiddleware')

// eslint-disable-next-line consistent-return
export default ({ config }) => () => next => async action => {
  switch (action.type) {
    case LOAD_ALERTS:
      try {
        const alerts = await config.load('alerts')

        alerts.forEach(a => {
          a.level = ALERT // eslint-disable-line no-param-reassign
        })

        return next(createAction(action.type, alerts))
      } catch (err) {
        log.warn('Error loading alerts config', err)
      }

      break
    default:
      return next(action)
  }
}
