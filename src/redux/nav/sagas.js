import { takeLatest, call } from 'redux-saga/effects'
import { StackActions, DrawerActions } from 'react-navigation'

import IPC_UI_TASKS from '../../../common/constants/ipcUiTasks'
import { globalEvents } from '../../env'
import { getStore } from '../'
import { createAction } from '../utils'
import { AUTHENTICATED } from '../account/actions'
import { onceAuthenticatedRouteName } from '../../ui/nav'

const { TOGGLE_DRAWER } = DrawerActions

function* onNavReset (_, { routeName }) {
  const store = getStore()

  if (!store.selectors.isUserAuthenticated() && routeName === onceAuthenticatedRouteName) {
    yield call([ store, 'dispatch' ], createAction(AUTHENTICATED))
  }
}

// eslint-disable-next-line require-yield
function* onToggleDrawer () {
  globalEvents.emit(IPC_UI_TASKS.TOGGLE_DRAWER)
}

export default app => function* saga () {
  yield takeLatest(StackActions.RESET, onNavReset, app)
  yield takeLatest(TOGGLE_DRAWER, onToggleDrawer, app)
}

export const _privateFunctions = {
  onNavReset
}
