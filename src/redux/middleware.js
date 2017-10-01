import configMiddleware from './config/middleware'
import nodeMiddleware from './node/middleware'
import web3Middleware from './web3/middleware'

export const createMiddleware = app => [
  // first let's ensure the final `dispatch` function is async
  () => next => async action => next(action),
  // now we can add our actual middlware
  configMiddleware(app),
  nodeMiddleware(app),
  web3Middleware(app)
]
