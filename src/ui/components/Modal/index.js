import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'

import FadingView from '../FadingView'
import CloseButton from './CloseButton'
import TouchableView from '../TouchableView'
import styles from './styles'

const Modal = ({
  children,
  onOverlayPress,
  overlayStyle,
  contentStyle,
  onPressCloseButton,
  closeButtonStyle
}) => (
  <FadingView style={styles.fadeWrapper}>
    <TouchableView onPress={onOverlayPress} style={[ styles.overlay, overlayStyle ]}>
      <View style={[ styles.content, contentStyle ]}>
        {children}
        {onPressCloseButton ? (
          <CloseButton
            style={[ styles.closeButton, closeButtonStyle ]}
            onPress={onPressCloseButton}
          />
        ) : null}
      </View>
    </TouchableView>
  </FadingView>
)

Modal.propTypes = {
  overlayStyle: PropTypes.oneOfType([ PropTypes.number, PropTypes.object ]),
  contentStyle: PropTypes.oneOfType([ PropTypes.number, PropTypes.object ]),
  onOverlayPress: PropTypes.func,
  onPressClose: PropTypes.func
}

export default Modal
