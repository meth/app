import React, { PureComponent } from 'react'
import { Text } from 'react-native'
import { StackActions, createStackNavigator, createDrawerNavigator } from 'react-navigation'

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
  AddressBook,
  Contracts,
  Transactions,
  Wallet
} = baseRoutes


const LoggedOutStack = createStackNavigator({
  Home,
  LoginMnemonic,
  GenerateMnemonic,
  ConfirmNewMnemonic
}, {
  ...disableGesturesProps,
  headerMode: 'none',
  mode: 'card',
  initialRouteName: Home.routeName
})

const LoggedInStack = createStackNavigator({
  LoggedInDrawer: createDrawerNavigator({
    Wallet,
    Contracts,
    Transactions,
    AddressBook
  })
}, {
  headerMode: 'float',
  navigationOptions: ({ navigation }) => ({
    headerStyle: { backgroundColor: '#4C3E54' },
    headerLeft: <Text onPress={() => (
      getStore().actions.navToggleDrawer(
        navigation.navigate('DrawerOpen')
      )
    )}>Menu</Text>,
    title: 'Welcome!',
    headerTintColor: '#fff'
  })
})

const RootNavigator = createStackNavigator({
  LoggedOutStack,
  LoggedInStack
}, {
  ...disableGesturesProps,
  headerMode: 'none',
  initialRouteName: 'LoggedOutStack'
})


export const routes = {
  ...baseRoutes
}

export const { router } = RootNavigator

export const onceLoggedInRouteName = 'LoggedInStack'

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
