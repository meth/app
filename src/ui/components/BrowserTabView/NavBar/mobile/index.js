import React, { PureComponent } from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'

import styles from './styles'
import TextInput from '../../../TextInput'
import BrowserTabMenu from '../../../BrowserTabMenu'


export default class NavBar extends PureComponent {
  static propTypes = {
    style: PropTypes.any,
    onAddressInputRef: PropTypes.func.isRequired,
    url: PropTypes.string.isRequired,
    hasBookmark: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onRefresh: PropTypes.func.isRequired,
    onEditBookmark: PropTypes.func.isRequired,
    onShowBookmarks: PropTypes.func.isRequired,
    renderAfterAddressInput: PropTypes.func
  }

  render () {
    const {
      style,
      onAddressInputRef,
      url,
      onChange,
      onSubmit,
      renderAfterAddressInput,
      onRefresh,
      onEditBookmark,
      onShowBookmarks,
      hasBookmark
    } = this.props

    return (
      <View style={style}>
        <TextInput
          ref={onAddressInputRef}
          value={url}
          onChange={onChange}
          onSubmit={onSubmit}
          style={styles.navUrlInput}
          selectTextOnFocus
        />
        {renderAfterAddressInput ? renderAfterAddressInput() : null}
        <BrowserTabMenu
          style={styles.tabMenu}
          onRefresh={onRefresh}
          hasBookmark={hasBookmark}
          onEditBookmark={onEditBookmark}
          onShowBookmarks={onShowBookmarks}
        />
      </View>
    )
  }
}
