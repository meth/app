import _ from 'lodash'
import React, { PureComponent } from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'

import { t } from '../../../../common/strings'
import styles from './styles'
import { addProtocol } from '../../../utils/url'
import IconButton from '../IconButton'
import TextInput from '../TextInput'
import WebView from '../WebView'


export default class BrowserTabView extends PureComponent {
  static propTypes = {
    ...WebView.propTypes,
    editDappPermissions: PropTypes.func.isRequired,
    onShowBookmarks: PropTypes.func.isRequired
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
    const { onShowBookmarks } = this.props

    return (
      <View style={styles.container}>
        <View style={styles.navBar}>
          <IconButton
            type='browserTab'
            tooltip={t('button.browser.back')}
            icon={{ name: 'chevron-left' }}
            style={styles.navIconButton}
            onPress={this.back}
          />
          <IconButton
            type='browserTab'
            tooltip={t('button.browser.forward')}
            icon={{ name: 'chevron-right' }}
            style={styles.navIconButton}
            onPress={this.forward}
          />
          <IconButton
            type='browserTab'
            tooltip={t('button.browser.reload')}
            icon={{ name: 'refresh' }}
            style={styles.navIconButton}
            onPress={this.refresh}
          />
          <TextInput
            ref={this._onAddressInputRef}
            value={url}
            onChange={this.onChangeUrl}
            onSubmit={this.onEnterUrl}
            style={styles.navUrlInput}
            selectTextOnFocus
          />
          <IconButton
            type='browserAddressInput'
            tooltip={t('button.browser.editBookmark')}
            icon={{ name: 'star' }}
            onPress={this._onEditBookmark}
            style={styles.bookmarkButton}
          />
          <IconButton
            type='browserTab'
            tooltip={t('button.browser.showBookmarks')}
            icon={{ name: 'bookmark' }}
            style={styles.navIconButton}
            onPress={onShowBookmarks}
          />
          {/*
            <IconButton
              type='browserTab'
              tooltip={t('button.browser.editPermissions')}
              icon={{ name: 'gear' }}
              style={styles.navIconButton}
              onPress={editDappPermissions}
            />
          */}
        </View>
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
