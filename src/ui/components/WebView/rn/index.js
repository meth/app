import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import WebView from 'react-native-wkwebview-reborn'

import IPC from '../../../../../common/constants/ipc'
import { handleWebViewIpcRequest } from '../ipcHandlers'

export default class RnWebView extends PureComponent {
  static propTypes = {
    url: PropTypes.string.isRequired,
    apiMethods: PropTypes.object.isRequired,
    permissions: PropTypes.object.isRequired,
    onUrlChange: PropTypes.func.isRequired,
    onTitleChange: PropTypes.func.isRequired,
    onLoading: PropTypes.func.isRequired,
    onLoaded: PropTypes.func.isRequired,
    onLoadingError: PropTypes.func.isRequired,
    onOpenNewWindow: PropTypes.func.isRequired
  }

  render () {
    const { url } = this.props

    return (
      <WebView
        ref={this._onWebViewRef}
        source={{ uri: url }}
        style={{
          width: '100%',
          height: '100%'
        }}
        openNewWindowInWebView={true}
        onError={this.onLoadingError}
        onLoadStart={this.onLoading}
        onLoad={this.onLoading}
        onLoadEnd={this.onLoaded}
        onNavigationStateChange={this.onNavigate}
        onMessage={this.onMessage}
      />
    )
  }

  _onWebViewRef = v => {
    this.webView = v
  }

  /* event handlers */

  onLoading = () => {
    this.props.onLoading()
  }
  onLoaded = ev => {
    this.props.onLoaded()
    this.props.onUrlChange(ev.nativeEvent.url)
  }
  onLoadingError = () => {
    this.props.onLoadingError()
  }
  onMessage = (...args) => {
    console.warn('msg', args)
  }

  /* public methods */

  openUrl = url => {
    this.props.onUrlChange(url)
  }

  goBack = () => {
    // not supported
  }

  goForward = () => {
    // not supported
  }

  refresh = () => {
    if (this.webView) {
      this.webView.reload()
    }
  }

  openDevTools = () => {
    // not supported
  }
}
