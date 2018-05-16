import { handleActions } from 'redux-actions'
import { StackActions, DrawerActions, NavigationActions } from 'react-navigation'

const { RESET } = StackActions
const { NAVIGATE, BACK } = NavigationActions
const { TOGGLE_DRAWER, CLOSE_DRAWER } = DrawerActions

export default ({ router }) => {
  const InitialState = router.getStateForAction(NavigationActions.init())

  return handleActions(
    {
      [BACK]: (state, action) => router.getStateForAction(action, state),
      [NAVIGATE]: (state, action) => router.getStateForAction(action, state),
      [RESET]: (state, { routeName, params }) => router.getStateForAction(
        NavigationActions.navigate({ routeName, params })
      ),
      [TOGGLE_DRAWER]: (state, action) => router.getStateForAction(action, state),
      [CLOSE_DRAWER]: (state, action) => router.getStateForAction(action, state)
    },
    InitialState
  )
}
