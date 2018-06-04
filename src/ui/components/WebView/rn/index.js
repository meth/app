import _ from 'lodash'
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import WebView from './component'
import Logger from '../../../../logger'
import { handleWebViewIpcRequest } from '../ipcHandlers'
import preloadJs from './preload'

const log = Logger.create('RnWebView')

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
        url={url}
        jsToInject={preloadJs()}
        onLoadingError={this.onLoadingError}
        onLoading={this.onLoading}
        onLoaded={this.onLoaded}
        onNavigate={this.onNavigate}
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
  onMessage = ev => {
    try {
      const { id, type, payload } = JSON.parse(_.get(ev, 'nativeEvent.data', '{}'))

      const { permissions, apiMethods } = this.props

      handleWebViewIpcRequest(type, payload, { permissions, apiMethods })
        .then(response => {
          this._sendToWebView({ id, response })
        })
        .catch(err => {
          this._sendToWebView({ id, error: err.toString() })
        })
    } catch (err) {
      log.warn(err)
    }
  }

  _sendToWebView (data) {
    this.webView.inject(`window.receivedMessageFromReactNative(${JSON.stringify(data)});`)
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
