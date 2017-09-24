import { createAction } from 'redux-actions'

import { PUSH, RESET } from './actions'

export const push = createAction(PUSH, (pathName, params = {}) => ({
  pathName,
  params
}))

export const reset = createAction(RESET, (pathName, params = {}) => ({
  pathName,
  params
}))
