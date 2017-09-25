import { createAction } from 'redux-actions'

import { PUSH, RESET } from './actions'

export const push = createAction(PUSH, (path, params = {}) => ({
  path,
  params
}))

export const reset = createAction(RESET, (path, params = {}) => ({
  path,
  params
}))
