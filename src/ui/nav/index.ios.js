import { createStackNavigator } from 'react-navigation'

import Home from '../containers/pages/Home'

export const routes = {
  Home: {
    screen: Home,
    path: ''
  }
}

routes.OnceLoggedIn = routes.Home

export const Navigator = createStackNavigator(routes)

export const { router } = Navigator
router.initialPath = routes.Home.path
