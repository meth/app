import config from '../config'
import configMiddleware from './config/middleware'

// parameter to pass to middleware setup functions
const params = { config }

export default [ configMiddleware(params) ]
