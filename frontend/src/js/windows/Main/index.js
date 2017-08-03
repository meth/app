import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import { create as createStore } from '../../utils/store'
import { Dispatcher } from './data/dispatcher'
import Page from './ui/Page'

module.exports = {
  NAME: 'Main',
  show: () => {
    const store = createStore(require('./data/reducers'))
    Dispatcher.setStore(store)

    Dispatcher.init()

    // ReactDOM.render(
    //   <Provider store={store}>
    //     <Page />
    //   </Provider>,
    //   document.getElementById('react-root')
    // )
  }
}
