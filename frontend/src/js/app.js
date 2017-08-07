import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import { create as createStore } from './utils/store'

const WINDOWS = [
  require('./windows/ConnectToNode'),
  require('./windows/Main'),
]

// get hash
let hash = window.location.hash.match(/#([a-zA-Z0-9]*)/)
hash = (hash && 1 < hash.length) ? hash[1] : 'Main'

// calculate match
let matched = false

for (const wnd of WINDOWS) {
  if (hash === wnd.name) {
    matched = wnd

    break
  }
}

if (!matched) {
  console.error(`No window matching hash: ${hash}`)
} else {
  console.log(`Window matched: ${matched.name}`)

  const { reducers, dispatcher, RootComponent } = matched

  const store = createStore(reducers)
  dispatcher.setStore(store)

  ReactDOM.render(
    <Provider store={store}>
      <RootComponent />
    </Provider>,
    document.getElementById('react-root')
  )
}
