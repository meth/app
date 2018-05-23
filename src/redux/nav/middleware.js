import { NAV_POST_LOGIN, NAV_POST_PIN } from './actions'
import { navReset, navGo } from './actionCreators'
import { getStore } from '../'
import { onceAuthenticatedRouteName, routes } from '../../ui/nav'

// eslint-disable-next-line consistent-return
export default () => ({ dispatch }) => next => async action => {
  const {
    selectors: {
      getSecurityPin
    }
  } = getStore()

  switch (action.type) {
    case NAV_POST_PIN: {
      return dispatch(navReset(onceAuthenticatedRouteName))
    }
    case NAV_POST_LOGIN: {
      const pin = getSecurityPin()

      return dispatch(navGo(
        (pin ? routes.EnterPinAfterLogin : routes.SetupPin).routeName
      ))
    }
    default: {
      return next(action)
    }
  }
}
