import { NavigationActions, StackActions, DrawerActions } from 'react-navigation'

export const navBack = ({ key, immediate }) => NavigationActions.back({ key, immediate })

export const navGo = (routeName, params) => NavigationActions.navigate({ routeName, params })

export const navReset = (routeName, params) => ({
  type: StackActions.RESET,
  routeName,
  params
})

export const navToggleDrawer = () => DrawerActions.toggleDrawer()

export const navCloseDrawer = () => DrawerActions.closeDrawer()
