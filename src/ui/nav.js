import React, { Component } from 'react'
import { NavigationActions, addNavigationHelpers, createNavigator, TabRouter } from 'react-navigation'

import { connectRedux } from './helpers/decorators'

import LoginMnemonic from './pages/LoginMnemonic'
import ConfirmNewMnemonic from './pages/ConfirmNewMnemonic'
import Browser from './pages/Browser'


export const routes = {
  Home: {
    screen: LoginMnemonic,
    path: ''
  },
  ConfirmNewMnemonic: {
    screen: ConfirmNewMnemonic,
    path: 'confirmNewMnemonic',
  },
  Browser: {
    screen: Browser,
    path: 'browser',
  },
}

export const Router = TabRouter(routes, {
  navigationOptions: () => ({
    tabBarVisible: false
  })
})

// custom navigator - see https://reactnavigation.org/docs/navigators/custom
@connectRedux()
class NavigatorView extends Component {
  render () {
    const { router, dispatch } = this.props

    const state = this.props.store.nav

    const Component = router.getComponentForState(state)

    const currentRoute = state.routes[state.index]

    const navProps = addNavHelpers({ dispatch, state, currentRoute })

    return <Component navigation={navProps} />
  }
}


export const Navigator = createNavigator(Router)(NavigatorView)

export const NavActions = NavigationActions
export const addNavHelpers = addNavigationHelpers
