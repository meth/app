import { NavigationActions, StackActions, DrawerActions } from 'react-navigation'

import { NAV_POST_LOGIN } from './actions'
import { createActionCreator } from '../utils'


export const navBack = ({ key, immediate }) => NavigationActions.back({ key, immediate })

export const navGo = (routeName, params) => NavigationActions.navigate({ routeName, params })

export const navReset = (routeName, params) => ({
  type: StackActions.RESET,
  routeName,
  params
})

export const navPostLogin = createActionCreator(NAV_POST_LOGIN)

export const navToggleDrawer = () => DrawerActions.toggleDrawer()

export const navCloseDrawer = () => DrawerActions.closeDrawer()
