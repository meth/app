import React, { PureComponent } from 'react'
import {
  addNavigationHelpers,
  createNavigator,
  StackRouter
} from 'react-navigation'

import { connectStore } from '../helpers/redux'
import Home from '../containers/pages/Home'
import Test from '../containers/pages/Test'
import GenerateMnemonic from '../containers/pages/GenerateMnemonic'
import LoginMnemonic from '../containers/pages/LoginMnemonic'
import ConfirmNewMnemonic from '../containers/pages/ConfirmNewMnemonic'
import AddressBook from '../containers/pages/AddressBook'
import Contracts from '../containers/pages/Contracts'
import Wallet from '../containers/pages/Wallet'
import Browser from '../containers/pages/Browser'
import Transactions from '../containers/pages/Transactions'

export const routes = {
  Home: {
    screen: Home,
    path: ''
  },
  Test: {
    screen: Test,
    path: 'test'
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
  Wallet: {
    screen: Wallet,
    path: 'wallet'
  },
  AddressBook: {
    screen: AddressBook,
    path: 'addressBook'
  },
  Contracts: {
    screen: Contracts,
    path: 'contracts'
  },
  Browser: {
    screen: Browser,
    path: 'browser'
  },
  Transactions: {
    screen: Transactions,
    path: 'transactions'
  }
}

routes.OnceLoggedIn = {
  ...routes.Wallet
}

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
router.initialPath = 'login'

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
