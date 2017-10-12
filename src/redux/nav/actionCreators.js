import { createAction } from 'redux-actions'

import { PUSH, RESET } from './actions'

export const navPush = createAction(PUSH, (path, params = {}) => ({
  path,
  params
}))

export const navReset = createAction(RESET, (path, params = {}) => ({
  path,
  params
}))
