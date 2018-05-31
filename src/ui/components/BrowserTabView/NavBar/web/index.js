import React, { PureComponent } from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'

import { t } from '../../../../../../common/strings'
import styles from './styles'
import IconButton from '../../../IconButton'
import TextInput from '../../../TextInput'


export default class NavBar extends PureComponent {
  static propTypes = {
    style: PropTypes.any,
    onAddressInputRef: PropTypes.func.isRequired,
    url: PropTypes.string.isRequired,
    hasBookmark: PropTypes.bool,
    onBack: PropTypes.func.isRequired,
    onForward: PropTypes.func.isRequired,
    onRefresh: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onEditBookmark: PropTypes.func.isRequired,
    onShowBookmarks: PropTypes.func.isRequired
  }

  render () {
    const {
      style,
      onAddressInputRef,
      url,
      hasBookmark,
      onBack,
      onForward,
      onRefresh,
      onChange,
      onSubmit,
      onEditBookmark,
      onShowBookmarks
    } = this.props

    return (
      <View style={style}>
        <IconButton
          type='browserTab'
          tooltip={t('button.browser.back')}
          icon={{ name: 'chevron-left' }}
          style={styles.navIconButton}
          onPress={onBack}
        />
        <IconButton
          type='browserTab'
          tooltip={t('button.browser.forward')}
          icon={{ name: 'chevron-right' }}
          style={styles.navIconButton}
          onPress={onForward}
        />
        <IconButton
          type='browserTab'
          tooltip={t('button.browser.reload')}
          icon={{ name: 'refresh' }}
          style={styles.navIconButton}
          onPress={onRefresh}
        />
        <TextInput
          ref={onAddressInputRef}
          value={url}
          onChange={onChange}
          onSubmit={onSubmit}
          style={styles.navUrlInput}
          selectTextOnFocus
        />
        <IconButton
          type='browserAddressInput'
          tooltip={t('button.browser.editBookmark')}
          icon={{ name: 'star' }}
          onPress={onEditBookmark}
          style={styles.bookmarkButton}
          {...(hasBookmark ? {
            stateOverride: {
              buttonState: 'hover'
            }
          } : null)}
        />
        <IconButton
          type='browserTab'
          tooltip={t('button.browser.showBookmarks')}
          icon={{ name: 'bookmark' }}
          style={styles.navIconButton}
          onPress={onShowBookmarks}
        />
      </View>
    )
  }
}
