import { createActionCreator } from '../utils'

import { PUSH, RESET } from './actions'

export const navPush = createActionCreator(PUSH, (path, params = {}) => ({
  path,
  params
}))

export const navReset = createActionCreator(RESET, (path, params = {}) => ({
  path,
  params
}))
