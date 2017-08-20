import _ from 'lodash'
import React, { Component } from 'react'


export default class WebView extends Component {
  constructor (props, ctx) {
    super(props, ctx)

    this.webViewEventHandlers = {
      'did-start-loading': this.onLoading,
      'did-get-redirect-request': this.onRedirect,
      'did-navigate': this.onNavigate,
      'did-stop-loading': this.onLoaded,
      'did-fail-load': this.onLoadingError,
      'crashed': this.onLoadingError,
      'gpu-crashed': this.onLoadingError,
      'plugin-crashed': this.onLoadingError,
      'page-title-updated': this.onNewTitle,
      'new-window': this.onNewWindow,
    }
  }

  render () {
    const { url } = this.props

    return (
      <webview
        ref={v => { this.webView = v }}
        src={url}
        style={{
          width: '100%',
          height: '100%',
        }}
      />
    )
  }

  componentWillUnmount () {
    _.map(this.webViewEventHandlers, (f, e) => {
      this.webView.removeEventListener(e, f)
    })
  }

  componentDidMount () {
    _.map(this.webViewEventHandlers, (f, e) => {
      this.webView.addEventListener(e, f)
    })
  }

  /* event handlers */

  onLoading = () => this.props.onLoading()
  onLoaded = () => this.props.onLoaded()
  onLoadingError = ({ isMainFrame, errorDescription }) => {
    if (isMainFrame) {
      this.props.onLoadingError(errorDescription)
    }
  }
  onNavigate = ({ url }) => {
    this.props.onRedirect(url)
  }
  onRedirect = ({ newURL, isMainFrame }) => {
    if (isMainFrame) {
      this.props.onRedirect(newURL)
    }
  }
  onNewTitle = ({ title }) => this.props.onNewTitle(title)
  onNewWindow = ({ url }) => this.props.onOpenNewWindow(url)

  /* public methods */

  openUrl = (url) => {
    this.webView.loadURL(url)
  }
}
