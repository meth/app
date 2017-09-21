import { NavigationActions } from 'react-navigation'
import { createAction } from 'redux-actions'

const { RESET, NAVIGATE } = NavigationActions

export const push = createAction(NAVIGATE, (pathName, params = {}) => ({
  pathName,
  params
}))

export const reset = createAction(RESET, (pathName, params = {}) => ({
  pathName,
  params
}))
