import React, { PureComponent } from 'react'
import WkWebView from 'react-native-wkwebview-reborn'

export default class IosWebView extends PureComponent {
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
      <WkWebView
        ref={this._onRef}
        source={{ uri: url }}
        style={{
          width: '100%',
          height: '100%'
        }}
        injectJavaScript={jsToInject}
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
    this.nativeWebView.evaluateJavaScript(js)
  }
}
