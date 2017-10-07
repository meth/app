import React, { PureComponent } from 'react'
import {
  NavigationActions,
  addNavigationHelpers,
  createNavigator,
  TabRouter
} from 'react-navigation'

import { connectStore, mutable } from './helpers/redux'

import LoginMnemonic from './containers/LoginMnemonic'
import ConfirmNewMnemonic from './containers/ConfirmNewMnemonic'
import Browser from './containers/Browser'

export const routes = {
  Home: {
    screen: LoginMnemonic,
    path: ''
  },
  ConfirmNewMnemonic: {
    screen: ConfirmNewMnemonic,
    path: 'confirmNewMnemonic'
  },
  Browser: {
    screen: Browser,
    path: 'browser'
  }
}

export const router = TabRouter(routes, {
  navigationOptions: () => ({
    tabBarVisible: false
  })
})

export const NavActions = NavigationActions
export const addNavHelpers = addNavigationHelpers

// custom navigator - see https://reactnavigation.org/docs/navigators/custom
@connectStore('nav')
class NavigatorView extends PureComponent {
  render () {
    const { nav: state, router: navRouter, dispatch } = mutable(this.props)

    const Component = navRouter.getComponentForState(state)

    const currentRoute = state.routes[state.index]

    const navProps = addNavHelpers({ dispatch, state, currentRoute })

    return <Component navigation={navProps} />
  }
}

export const Navigator = createNavigator(router)(NavigatorView)
