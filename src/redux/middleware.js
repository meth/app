import configMiddleware from './config/middleware'
import nodeMiddleware from './node/middleware'
import apiMiddleware from './api/middleware'

export const createMiddleware = app => [
  // first let's ensure the final `dispatch` function is async
  () => next => async action => next(action),
  // now we can add our actual middlware
  configMiddleware(app),
  nodeMiddleware(app),
  apiMiddleware(app)
]
