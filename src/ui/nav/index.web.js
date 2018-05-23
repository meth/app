import React, { PureComponent } from 'react'
import {
  addNavigationHelpers,
  createNavigator,
  StackRouter
} from 'react-navigation'

import baseRoutes from './routes'
import { connectStore } from '../helpers/redux'


export const router = StackRouter(baseRoutes, {
  navigationOptions: () => ({
    tabBarVisible: false
  })
})

export const routes = {
  ...baseRoutes
}

export const onceAuthenticatedRouteName = routes.Wallet.routeName

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
