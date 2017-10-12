import * as config from './config/actionCreators'
import * as nav from './nav/actionCreators'
import * as modals from './modals/actionCreators'
import * as node from './node/actionCreators'
import * as wallet from './wallet/actionCreators'
import * as api from './api/actionCreators'

export default { ...config, ...nav, ...modals, ...node, ...wallet, ...api }
