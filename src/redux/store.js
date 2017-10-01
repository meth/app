import { applyMiddleware, compose, combineReducers, createStore } from 'redux'
import { createSagaMiddleware } from 'redux-saga'

import reducers from './reducers'
import { createMiddleware } from './middleware'
import sagas from './sagas'

export const create = app => {
  const sagaMiddleware = createSagaMiddleware()
  const appMiddleware = createMiddleware(app)

  const store = compose(applyMiddleware([ ...appMiddleware, sagaMiddleware ]))(
    createStore
  )(combineReducers(reducers))

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

  // kick-off sagas
  sagaMiddleware.run(sagas)

  return store
}
