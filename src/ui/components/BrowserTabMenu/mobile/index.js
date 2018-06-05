import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import { Header } from 'react-navigation'

import { t } from '../../../../../common/strings'
import IPC_UI_TASKS from '../../../../../common/constants/ipcUiTasks'
import { globalEvents } from '../../../../env'
import IconButton from '../../IconButton'
import ExpandingView from '../../ExpandingView'
import TouchableView from '../../TouchableView'
import Icon from '../../Icon'
import IconText from '../../IconText'
import { Popup } from '../../Popup'
import styles from './styles'
import { getWindowDimensions } from '../../../styles'



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
            <TouchableView style={styles.menuOverlay} onPress={this._onToggleMenu}>
              <ExpandingView style={styles.menuContainer}>
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
              </ExpandingView>
            </TouchableView>
          </Popup>
        )}
      </View>
    )
  }

  componentDidMount () {
    globalEvents.on(IPC_UI_TASKS.TOGGLE_DRAWER, this._onCloseMenu)
  }

  componentWillUnmount () {
    globalEvents.off(IPC_UI_TASKS.TOGGLE_DRAWER, this._onCloseMenu)
  }

  _onLayout = (/* { nativeEvent: { layout: { y, height } } } */) => {
    const { width: devWidth, height: devHeight } = getWindowDimensions()
    const top = Header.HEIGHT

    this.setState({
      popupStyle: {
        top,
        right: 0,
        width: devWidth,
        height: devHeight - top
      }
    })
  }

  _onToggleMenu = () => {
    this.setState({
      open: !this.state.open
    })
  }

  _onCloseMenu = () => {
    this.setState({
      open: false
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
