import config from '../config'
import configMiddleware from './config/middleware'
import nodeMiddleware from './node/middleware'
import web3Middleware from './web3/middleware'

// parameter to pass to middleware setup functions
const params = { config }

export default [
  configMiddleware(params),
  nodeMiddleware(params),
  web3Middleware(params)
]
