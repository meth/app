import React, { PureComponent } from 'react'
import {
  addNavigationHelpers,
  createNavigator,
  StackRouter
} from 'react-navigation'

import { routes, initialRoute } from './routes'
import { connectStore } from '../helpers/redux'


// add route name as key as well so we can compare with nav state later on
Object.keys(routes).forEach(routeName => {
  // eslint-disable-next-line no-param-reassign
  routes[routeName].routeName = routeName
})

export const router = StackRouter(routes, {
  navigationOptions: () => ({
    tabBarVisible: false
  })
})
router.initialPath = initialRoute.path

// custom navigator - see https://reactnavigation.org/docs/navigators/custom
@connectStore('nav')
class NavigatorView extends PureComponent {
  render () {
    const { nav: state, router: navRouter, dispatch } = this.props

    const Component = navRouter.getComponentForState(state)

    const currentRoute = state.routes[state.index]

    const navProps = addNavigationHelpers({ dispatch, state, currentRoute })

    return <Component navigation={navProps} />
  }
}

export const Navigator = createNavigator(router)(NavigatorView)

// just need dummy function for web
export const addRouteListener = () => {}
