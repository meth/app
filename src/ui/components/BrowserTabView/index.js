import _ from 'lodash'
import React, { PureComponent } from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'

import NavBar from './NavBar'
import styles from './styles'
import { addProtocol } from '../../../utils/url'
import WebView from '../WebView'


export default class BrowserTabView extends PureComponent {
  static propTypes = {
    ...WebView.propTypes,
    uniqueId: PropTypes.string,
    hasBookmark: PropTypes.bool,
    onEditDappPermissions: PropTypes.func.isRequired,
    onShowBookmarks: PropTypes.func.isRequired,
    onEditBookmark: PropTypes.func.isRequired,
    renderAfterAddressInput: PropTypes.func
  }

  static getDerivedStateFromProps (props, state) {
    return _.get(props, 'url') !== _.get(state, 'url') ? {
      ...state,
      url: props.url
    } : (state || {})
  }

  state = {}

  render () {
    const { url } = this.state
    const { onShowBookmarks, hasBookmark, renderAfterAddressInput } = this.props

    return (
      <View style={styles.container}>
        <NavBar
          style={styles.navBar}
          onAddressInputRef={this._onAddressInputRef}
          url={url}
          hasBookmark={hasBookmark}
          onBack={this.back}
          onForward={this.forward}
          onRefresh={this.refresh}
          onChange={this.onChangeUrl}
          onSubmit={this.onEnterUrl}
          onEditBookmark={this._onEditBookmark}
          onShowBookmarks={onShowBookmarks}
          renderAfterAddressInput={renderAfterAddressInput}
        />
        <View style={styles.webView}>
          <WebView
            {...this.props}
            onRedirect={this.props.onUrlChange}
            onNewTitle={this.props.onTitleChange}
            ref={this._onWebViewRef}
          />
        </View>
      </View>
    )
  }

  _onAddressInputRef = input => {
    this.addressInput = input
  }

  _onWebViewRef = v => {
    this.webView = v
  }

  _onEditBookmark = () => {
    const { url } = this.state
    const { onEditBookmark } = this.props

    onEditBookmark(url)
  }

  onChangeUrl = url => {
    this.setState({ url })
  }

  onEnterUrl = () => {
    this.webView.openUrl(addProtocol(this.state.url))
  }

  back = () => {
    this.webView.goBack()
  }

  forward = () => {
    this.webView.goForward()
  }

  refresh = () => {
    this.webView.refresh()
  }

  focusAddressBar = () => {
    if (this.addressInput) {
      this.addressInput.focus()
    }
  }

  openDevTools = () => {
    this.webView.openDevTools()
  }
}
