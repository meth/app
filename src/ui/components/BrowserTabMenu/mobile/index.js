import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import { Header } from 'react-navigation'

import { t } from '../../../../../common/strings'
import IconButton from '../../IconButton'
import TouchableView from '../../TouchableView'
import Icon from '../../Icon'
import IconText from '../../IconText'
import { Popup } from '../../Popup'
import styles from './styles'


export default class BrowserTabMenu extends PureComponent {
  static propTypes = {
    style: PropTypes.any,
    hasBookmark: PropTypes.bool,
    onRefresh: PropTypes.func.isRequired,
    onEditBookmark: PropTypes.func.isRequired,
    onOpenNewWindow: PropTypes.func.isRequired,
    onShowBookmarks: PropTypes.func.isRequired
  }

  state = {
    open: false,
    popupStyle: {}
  }

  render () {
    const { open, popupStyle } = this.state
    const { style, hasBookmark } = this.props

    return (
      <View style={style} onLayout={this._onLayout}>
        <IconButton
          type='mobileHeader'
          style={styles.button}
          icon={{ name: 'dots-vertical', style: styles.buttonIcon }}
          onPress={this._onToggleMenu}
        />
        {(!open) ? null : (
          <Popup style={popupStyle}>
            <View style={styles.menuContainer}>
              <View style={styles.option}>
                <TouchableView onPress={this._refresh} style={styles.iconButton}>
                  <Icon
                    name='refresh'
                    style={styles.iconButtonText}
                  />
                </TouchableView>
                <TouchableView onPress={this._onEditBookmark} style={styles.iconButton}>
                  <Icon
                    name={hasBookmark ? 'star' : 'star-o'}
                    style={styles.iconButtonText}
                  />
                </TouchableView>
              </View>
              <TouchableView
                style={styles.option}
                hoverStyle={styles.optionHover}
                onPress={this._onNewWindow}
              >
                <IconText
                  icon={{ name: 'tab' }}
                  text={t('button.browser.newTab')}
                  textStyle={styles.optionText}
                />
              </TouchableView>
              <TouchableView
                style={styles.option}
                hoverStyle={styles.optionHover}
                onPress={this._onShowBookmarks}
              >
                <IconText
                  icon={{ name: 'md-bookmarks' }}
                  text={t('button.browser.bookmarks')}
                  textStyle={styles.optionText}
                />
              </TouchableView>
            </View>
          </Popup>
        )}
      </View>
    )
  }

  _onLayout = ({ nativeEvent: { layout: { y, height } } }) => {
    this.setState({
      popupStyle: {
        top: y + height + Header.HEIGHT,
        right: 0
      }
    })
  }

  _onToggleMenu = () => {
    this.setState({
      open: !this.state.open
    })
  }

  _refresh = () => {
    this.setState({
      open: false
    }, () => {
      const { onRefresh } = this.props

      onRefresh()
    })
  }

  _onShowBookmarks = () => {
    this.setState({
      open: false
    }, () => {
      const { onShowBookmarks } = this.props

      onShowBookmarks()
    })
  }

  _onEditBookmark = () => {
    this.setState({
      open: false
    }, () => {
      const { onEditBookmark } = this.props

      onEditBookmark()
    })
  }

  _onNewWindow = () => {
    this.setState({
      open: false
    }, () => {
      const { onOpenNewWindow } = this.props

      onOpenNewWindow()
    })
  }
}
