import { Animated, Easing } from 'react-native'
import { createStackNavigator } from 'react-navigation'

const disableGesturesProps = {
  gesturesEnabled: false,
  gestureResponseDistance: {
    horizontal: 0,
    vertical: 0
  }
}

export default routes => {
  const {
    Home,
    LoginMnemonic,
    GenerateMnemonic,
    ConfirmNewMnemonic,
    EnterPinAfterLogin,
    SetupPin,
    AddressBook,
    Contracts,
    Transactions,
    Wallet,
    Browser
  } = routes

  return createStackNavigator({
    Home,
    LoginMnemonic,
    GenerateMnemonic,
    ConfirmNewMnemonic,
    EnterPinAfterLogin,
    SetupPin,
    AddressBook,
    Contracts,
    Transactions,
    Wallet,
    Browser
  }, {
    ...disableGesturesProps,
    headerMode: 'none',
    initialRouteName: Home.routeName,
    /* Disable animations, see https://github.com/react-navigation/react-navigation/issues/1254#issuecomment-297457689 */
    transitionConfig: () => ({
      transitionSpec: {
        duration: 0,
        timing: Animated.timing,
        easing: Easing.step0
      }
    })
  })
}
