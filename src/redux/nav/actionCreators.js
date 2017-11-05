import { createActionCreator } from '../utils'

import { BACK, PUSH, RESET } from './actions'

export const navBack = createActionCreator(BACK)

export const navPush = createActionCreator(PUSH, (path, params = {}) => ({
  path,
  params
}))

export const navReset = createActionCreator(RESET, (path, params = {}) => ({
  path,
  params
}))
