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
  const Navigator = createStackNavigator({
    ...routes
  }, {
    ...disableGesturesProps,
    headerMode: 'none',
    initialRouteName: routes.Home.routeName,
    /* Disable animations, see https://github.com/react-navigation/react-navigation/issues/1254#issuecomment-297457689 */
    transitionConfig: () => ({
      transitionSpec: {
        duration: 0,
        timing: Animated.timing,
        easing: Easing.step0
      }
    })
  })

  Navigator.onceAuthenticatedRouteName = routes.Contracts.routeName

  return Navigator
}
