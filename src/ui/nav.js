import React, { Component } from 'react'
import { NavigationActions, addNavigationHelpers, createNavigator, TabRouter } from 'react-navigation'

import { connectRedux } from './helpers/decorators'
import Mnemonic from './pages/Mnemonic'

const routes = {
  Mnemonic: {
    screen: Mnemonic,
    path: ''
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

    const navProps = addNavHelpers({ dispatch, state })

    return <Component navigation={navProps} />
  }
}


export const Navigator = createNavigator(Router)(NavigatorView)

export const NavActions = NavigationActions
export const addNavHelpers = addNavigationHelpers
