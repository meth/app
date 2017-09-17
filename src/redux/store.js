import { applyMiddleware, compose, combineReducers, createStore } from 'redux'

import reducers from './reducers'
import middleware from './middleware'

export const create = () => {
  const store = compose(applyMiddleware(...middleware))(createStore)(
    combineReducers(reducers)
  )

  // hot module reload
  if (__DEV__) {
    if (module.hot) {
      /* eslint-disable global-require */
      module.hot.accept('./reducers', () =>
        store.replaceReducer(require('./reducers').default)
      )
    }
  }

  /**
   * Helper to get store state as a plain object (taking Immutable instances into account).
   * @return {Object}
   */
  store.getStateObject = () => {
    const state = store.getState()

    return Object.keys(state).reduce((m, key) => {
      m[key] = state[key].toObject ? state[key].toObject() : state[key]
      return m
    }, {})
  }

  return store
}
