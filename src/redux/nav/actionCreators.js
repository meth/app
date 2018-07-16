import { NavigationActions, StackActions, DrawerActions } from 'react-navigation'

import { routes } from '../../ui/nav'
import { NAV_POST_LOGIN, NAV_POST_PIN } from './actions'
import { createActionCreator } from '../utils'


export const navGo = (routeName, params) => NavigationActions.navigate({ routeName, params })

export const navReset = (routeName, params) => ({
  type: StackActions.RESET,
  routeName,
  params
})

export const navLogout = () => navReset(routes.Home.routeName)

export const navPostLogin = createActionCreator(NAV_POST_LOGIN)

export const navPostPin = createActionCreator(NAV_POST_PIN)

export const navToggleDrawer = () => DrawerActions.toggleDrawer()

export const navCloseDrawer = () => DrawerActions.closeDrawer()
