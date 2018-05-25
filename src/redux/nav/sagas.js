import { takeLatest, call } from 'redux-saga/effects'
import { StackActions } from 'react-navigation'

import { getStore } from '../'
import { createAction } from '../utils'
import { AUTHENTICATED } from '../account/actions'
import { onceAuthenticatedRouteName } from '../../ui/nav'

function* onNavReset (_, { routeName }) {
  const store = getStore()

  if (!store.selectors.isUserAuthenticated() && routeName === onceAuthenticatedRouteName) {
    yield call([ store, 'dispatch' ], createAction(AUTHENTICATED))
  }
}

export default app => function* saga () {
  yield takeLatest(StackActions.RESET, onNavReset, app)
}

export const _privateFunctions = {
  onNavReset
}
