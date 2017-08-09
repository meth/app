import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import { alertUser } from './utils/alert'
import { create as createStore } from './data/store'
import dispatcher from './data/dispatcher'
import Root from './ui/Root'

const store = createStore()
dispatcher.setStore(store)

ReactDOM.render(
  <Provider store={store}>
    <Root />
  </Provider>,
  document.querySelector('#react-root')
)

// security check
if (window.require || window.exports || window.module) {
  alertUser('Node integration is active! This is a dangerous security leak!!')
}

// initialize the app!
dispatcher.init()
