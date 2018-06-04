import React, { PureComponent } from 'react'
import { WebView } from 'react-native'

export default class AndroidWebView extends PureComponent {
  render () {
    const {
      url,
      jsToInject,
      onLoadingError,
      onLoading,
      onLoaded,
      onNavigate,
      onMessage
    } = this.props

    return (
      <WebView
        ref={this._onRef}
        source={{ uri: url }}
        style={{
          width: '100%',
          height: '100%'
        }}
        injectedJavaScript={jsToInject}
        openNewWindowInWebView={true}
        onError={onLoadingError}
        onLoadStart={onLoading}
        onLoad={onLoading}
        onLoadEnd={onLoaded}
        onNavigationStateChange={onNavigate}
        onMessage={onMessage}
      />
    )
  }

  _onRef = e => {
    this.nativeWebView = e
  }

  reload () {
    this.nativeWebView.reload()
  }

  inject (js) {
    this.nativeWebView.injectJavaScript(js)
  }
}
