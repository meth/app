import { NavigationActions } from 'react-navigation'
import { handleActions } from 'redux-actions'

import { Router } from '../../ui/nav'

const { RESET, NAVIGATE } = NavigationActions

const InitialState = Router.getStateForAction(
  Router.getActionForPathAndParams('')
)

export default handleActions(
  {
    [RESET]: (state, { pathName, params }) =>
      Router.getStateForAction(
        Router.getActionForPathAndParams(pathName, params)
      ),
    [NAVIGATE]: (state, { pathName, params }) =>
      Router.getStateForAction(
        Router.getActionForPathAndParams(pathName, params),
        state
      )
  },
  InitialState
)
