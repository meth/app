import log from '../logger'
import configMiddleware from './config/middleware'
import nodeMiddleware from './node/middleware'
import apiMiddleware from './api/middleware'
import accountMiddleware from './account/middleware'

export const createMiddleware = app => [
  // first let's ensure the final `dispatch` function is async
  () => next => async action => {
    try {
      return await next(action)
    } catch (err) {
      log.warn('Middleware error', err)

      throw err
    }
  },
  // now we can add our actual middlware
  configMiddleware(app),
  nodeMiddleware(app),
  apiMiddleware(app),
  accountMiddleware(app)
]
