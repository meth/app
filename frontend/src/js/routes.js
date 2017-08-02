import React from 'react';
import { Router, IndexRoute, Route, hashHistory } from 'react-router';

import MainPage from './ui/pages/main';
import InitPage from './ui/pages/init';


export function create(store) {
  const ensureInitialized = function(nextState, replace) {
    const initialization = store.getState().app.get('initialization');
    
    if ('success' !== initialization.getState()) {
      replace('/');
    }
  }
  
  const ensureNotInitialized = function(nextState, replace) {
    const initialization = store.getState().app.get('initialization');

    if ('success' === initialization.getState()) {
      replace('/editor');
    }
  }

  return (
    <Route>
      <IndexRoute component={InitPage} onEnter={ensureNotInitialized} />
      <Route path="/main" component={MainPage} onEnter={ensureInitialized}/>
      <Route path="*" component={InitPage} onEnter={ensureNotInitialized}/>
    </Route>    
  );
}


