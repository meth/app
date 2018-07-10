import { View } from 'react-native'
import { createBottomTabNavigator } from 'react-navigation'

const disableGesturesProps = {
  gesturesEnabled: false,
  gestureResponseDistance: {
    horizontal: 0,
    vertical: 0
  }
}

export default routes => {
  const Navigator = createBottomTabNavigator({
    ...routes
  }, {
    ...disableGesturesProps,
    tabBarComponent: View,
    initialRouteName: routes.Home.routeName
  })

  Navigator.onceAuthenticatedRouteName = routes.Wallet.routeName

  return Navigator
}
