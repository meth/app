import {
  bindActionCreators,
  applyMiddleware,
  compose,
  combineReducers,
  createStore
} from 'redux'
import createSagaMiddleware from 'redux-saga'

import actionCreators from './actionCreators'
import selectors from './selectors'
import { createReducers } from './reducers'
import { createMiddleware } from './middleware'
import { createSagas } from './sagas'

let store

export const setupStore = app => {
  const sagaMiddleware = createSagaMiddleware()
  const appMiddleware = createMiddleware(app)
  const reducers = createReducers(app)
  const sagas = createSagas(app)

  store = compose(
    applyMiddleware(...appMiddleware, sagaMiddleware),
    window && window.devToolsExtension ? window.devToolsExtension() : f => f
  )(createStore)(combineReducers(reducers))

  // hot module reload
  if (__DEV__) {
    if (module.hot) {
      module.hot.accept('./reducers', () =>
        // eslint-disable-next-line global-require
        store.replaceReducer(require('./reducers').createReducers(app)))
    }
  }

  // kick-off sagas
  sagaMiddleware.run(sagas)

  // as a convenience, bind actions and selectors onto the store
  store.actions = bindActionCreators(actionCreators, store.dispatch)
  store.selectors = Object.keys(selectors).reduce(
    (set, fn) => ({
      ...set,
      [fn]: (...args) => selectors[fn](store.getState(), ...args)
    }),
    {}
  )

  // store.subscribe(() => {
  //   console.warn(JSON.stringify(store.getState().nav, null, 2))
  // })

  return store
}

export const getStore = () => store
