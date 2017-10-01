import { applyMiddleware, compose, combineReducers, createStore } from 'redux'

import reducers from './reducers'
import middleware from './middleware'

export const createReduxStore = () => {
  const store = compose(applyMiddleware(...middleware))(createStore)(
    combineReducers(reducers)
  )

  // hot module reload
  if (__DEV__) {
    if (module.hot) {
      module.hot.accept('./reducers', () => (
        // eslint-disable-next-line global-require
        store.replaceReducer(require('./reducers').default)
      ))
    }
  }

  /**
   * Helper to get store state as a plain object (taking Immutable instances into account).
   * @return {Object}
   */
  store.getStateObject = () => {
    const state = store.getState()

    return Object.keys(state).reduce((m, key) => {
      // eslint-disable-next-line no-param-reassign
      m[key] = state[key].toObject ? state[key].toObject() : state[key]
      return m
    }, {})
  }

  return store
}
