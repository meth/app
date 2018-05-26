import React, { PureComponent } from 'react'
import { Animated, Easing } from 'react-native'
import { StackActions, createStackNavigator } from 'react-navigation'

import { connectStore } from '../helpers/redux'
import { getStore } from '../../redux'
import baseRoutes from './routes'
import { addListener } from './reduxIntegration'

const disableGesturesProps = {
  gesturesEnabled: false,
  gestureResponseDistance: {
    horizontal: 0,
    vertical: 0
  }
}

const {
  Home,
  LoginMnemonic,
  GenerateMnemonic,
  ConfirmNewMnemonic,
  EnterPinAfterLogin,
  SetupPin,
  AddressBook,
  Contracts,
  Transactions,
  Wallet
} = baseRoutes


const RootNavigator = createStackNavigator({
  Home,
  LoginMnemonic,
  GenerateMnemonic,
  ConfirmNewMnemonic,
  EnterPinAfterLogin,
  SetupPin,
  AddressBook,
  Contracts,
  Transactions,
  Wallet
}, {
  ...disableGesturesProps,
  headerMode: 'none',
  initialRouteName: Home.routeName,
  /* Disable animations, see https://github.com/react-navigation/react-navigation/issues/1254#issuecomment-297457689 */
  transitionConfig: () => ({
    transitionSpec: {
      duration: 0,
      timing: Animated.timing,
      easing: Easing.step0
    }
  })
})


export const routes = {
  ...baseRoutes
}

export const { router } = RootNavigator

export const onceAuthenticatedRouteName = Wallet.routeName

@connectStore('nav')
export class Navigator extends PureComponent {
  render () {
    const { nav: state, dispatch } = this.props

    return (
      <RootNavigator
        navigation={{
          dispatch,
          state,
          addListener
        }}
      />
    )
  }
}

export const addRouteListener = (screenName, cb) => (
  addListener('action', ({ action: { type } }) => {
    if (StackActions.COMPLETE_TRANSITION === type) {
      const { routeName } = getStore().selectors.getCurrentRoute()

      if (routeName === screenName) {
        cb()
      }
    }
  })
)
