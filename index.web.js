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
