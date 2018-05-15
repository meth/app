import * as log from './log/selectors'
import * as config from './config/selectors'
import * as modals from './modals/selectors'
import * as node from './node/selectors'
import * as account from './account/selectors'

export default {
  ...log,
  ...config,
  ...modals,
  ...node,
  ...account
}
