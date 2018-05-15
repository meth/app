import {
  createReactNavigationReduxMiddleware,
  createReduxBoundAddListener
} from 'react-navigation-redux-helpers'

export const middleware = createReactNavigationReduxMiddleware('root', state => state.nav)

export const addListener = createReduxBoundAddListener('root')
