import React, { PureComponent } from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'

import { globalEvents } from '../../../env'
import UI_TASKS from '../../../../common/constants/ipcUiTasks'
import { Popup } from '../Popup'
import FadingView from '../FadingView'
import CloseButton from './CloseButton'
import TouchableView from '../TouchableView'
import styles from './styles'

export default class Modal extends PureComponent {
  static propTypes = {
    overlayStyle: PropTypes.any,
    contentStyle: PropTypes.any,
    closeButtonStyle: PropTypes.any,
    onOverlayPress: PropTypes.func,
    onPressCloseButton: PropTypes.func
  }

  render () {
    const {
      children,
      onOverlayPress,
      overlayStyle,
      contentStyle,
      onPressCloseButton,
      closeButtonStyle
    } = this.props

    return (
      <Popup style={styles.popupWrapper}>
        <FadingView style={styles.fadeWrapper}>
          <TouchableView onPress={onOverlayPress} style={[ styles.overlay ].concat(overlayStyle)}>
            <View style={[ styles.content ].concat(contentStyle)}>
              {children}
              {onPressCloseButton ? (
                <CloseButton
                  style={[ styles.closeButton ].concat(closeButtonStyle)}
                  onPress={onPressCloseButton}
                />
              ) : null}
            </View>
          </TouchableView>
        </FadingView>
      </Popup>
    )
  }

  componentDidMount () {
    globalEvents.on(UI_TASKS.ESCAPE, this._onDimissModal)
  }

  componentWillUnmount () {
    globalEvents.removeListener(UI_TASKS.ESCAPE, this._onDimissModal)
  }

  _onDimissModal = () => {
    const { onPressCloseButton } = this.props

    if (onPressCloseButton) {
      onPressCloseButton()
    }
  }
}
