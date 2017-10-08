import React from 'react'
import { AppRegistry } from 'react-native'
import { AppContainer } from 'react-hot-loader'

import App from './src/App'

const renderApp = () => (
  <AppContainer>
    <App />
  </AppContainer>
)

AppRegistry.registerComponent('Meth', () => renderApp)

if (module.hot) {
  module.hot.accept()

  const renderHotApp = () => (
    <AppContainer>
      <App />
    </AppContainer>
  )

  AppRegistry.registerComponent('Meth', () => renderHotApp)
}

AppRegistry.runApplication('Meth', {
  rootTag: document.getElementById('react-root')
})

export const alertUser = msg => {
  /* eslint-disable no-console */
  console.error(msg)
  /* eslint-disable no-alert */
  window.alert(msg)
}

// security check
if (window.require || window.exports || window.module) {
  alertUser('Node integration is active! This is a dangerous security leak!!')
}
