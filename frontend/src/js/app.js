import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import MainPage from './ui/pages/Main'
import { create as createStore } from './data/store'
import dispatcher from './data/dispatcher'

const store = createStore()
dispatcher.setStore(store)

ReactDOM.render(
  <Provider store={store}>
    <MainPage />
  </Provider>,
  document.querySelector('#react-root')
)
