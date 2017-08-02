import React from 'react';
import { Router, IndexRoute, Route, hashHistory } from 'react-router';

import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { create as createStore } from './data/store';
import { create as createRoutes } from './routes';
import { Dispatcher } from './data/actions';


const store = createStore(),
  routes = createRoutes(store);
  
Dispatcher.setStore(store);


ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>
      {routes}
    </Router>
  </Provider>,
  document.getElementById('react-root')
);


