import logger from '../logger'
import configMiddleware from './config/middleware'
import navMiddleware from './nav/middleware'
import nodeMiddleware from './node/middleware'
import apiMiddleware from './api/middleware'
import logMiddleware from './log/middleware'
import accountMiddleware from './account/middleware'

const log = logger.create('Middleware')

export const createMiddleware = app => [
  // first let's ensure the final `dispatch` function is async
  () => next => async action => {
    try {
      return await next(action)
    } catch (err) {
      log.warn(action.type, err)

      throw err
    }
  },
  // now we can add our actual middlware
  navMiddleware(app),
  configMiddleware(app),
  logMiddleware(app),
  nodeMiddleware(app),
  apiMiddleware(app),
  accountMiddleware(app)
]
