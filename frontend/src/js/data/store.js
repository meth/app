import { applyMiddleware, compose, combineReducers, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';

import * as reducers from './reducers';

let combinedReducer = combineReducers(reducers);

const middleware = [
  thunkMiddleware, 
  // createLogger(), 
];


export function create() {
  let store = compose(
    applyMiddleware(...middleware)
  )(createStore)(combinedReducer)
  
  // Livereactload
  if (module.onReload) {
    module.onReload(() => {
      store.replaceReducer(combineReducers(require('./reducers')));
      // return true to indicate that this module is accepted and
      // there is no need to reload its parent modules
      return true;
    });
  }

  return store;
};



