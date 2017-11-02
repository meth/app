import React, { PureComponent } from 'react'
import {
  NavigationActions,
  addNavigationHelpers,
  createNavigator,
  TabRouter
} from 'react-navigation'

import { connectStore } from './helpers/redux'
import Home from './containers/pages/Home'
import GenerateMnemonic from './containers/pages/GenerateMnemonic'
import LoginMnemonic from './containers/pages/LoginMnemonic'
import ConfirmNewMnemonic from './containers/pages/ConfirmNewMnemonic'
import Browser from './containers/pages/Browser'

export const routes = {
  Home: {
    screen: Home,
    path: ''
  },
  GenerateMnemonic: {
    screen: GenerateMnemonic,
    path: 'generate'
  },
  LoginMnemonic: {
    screen: LoginMnemonic,
    path: 'login'
  },
  ConfirmNewMnemonic: {
    screen: ConfirmNewMnemonic,
    path: 'confirm'
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
    const { nav: state, router: navRouter, dispatch } = this.props

    const Component = navRouter.getComponentForState(state)

    const currentRoute = state.routes[state.index]

    const navProps = addNavHelpers({ dispatch, state, currentRoute })

    return <Component navigation={navProps} />
  }
}

export const Navigator = createNavigator(router)(NavigatorView)
