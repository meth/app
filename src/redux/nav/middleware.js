import { NAV_POST_LOGIN, NAV_POST_PIN } from './actions'
import { navReset, navGo } from './actionCreators'
import { getStore } from '../'
import { onceAuthenticatedRouteName, routes } from '../../ui/nav'
import { waitUntil } from '../../utils/promise'

// eslint-disable-next-line consistent-return
export default () => ({ dispatch }) => next => async action => {
  const {
    selectors: {
      areAppSettingsLoaded,
      getSecurityPin
    }
  } = getStore()

  switch (action.type) {
    case NAV_POST_PIN: {
      return dispatch(navReset(onceAuthenticatedRouteName))
    }
    case NAV_POST_LOGIN: {
      // wait until app settings (and pin) are loaded from storage
      await waitUntil(areAppSettingsLoaded, true, 1000)

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
