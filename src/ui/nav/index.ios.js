import React, { PureComponent } from 'react'
import { StackActions, createStackNavigator } from 'react-navigation'

import { connectStore } from '../helpers/redux'
import { routes, initialRoute } from './routes'
import { addListener } from './reduxIntegration'

const AppNavigator = createStackNavigator(routes)

export const { router } = AppNavigator
router.initialPath = initialRoute.path

@connectStore('nav')
export class Navigator extends PureComponent {
  render () {
    const { nav: state, dispatch } = this.props

    return (
      <AppNavigator
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
  addListener('action', ({ action: { type }, state }) => {
    if (StackActions.COMPLETE_TRANSITION === type) {
      const { routeName } = state.routes[state.index]

      if (routeName === screenName) {
        cb()
      }
    }
  })
)
