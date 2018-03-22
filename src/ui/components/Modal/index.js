import React from 'react'
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
  <TouchableView onPress={onOverlayPress} style={[ styles.overlay, overlayStyle ]}>
    <FadingView style={[ styles.content, contentStyle ]}>
      {children}
      {onPressCloseButton ? (
        <CloseButton
          style={[ styles.closeButton, closeButtonStyle ]}
          onPress={onPressCloseButton}
        />
      ) : null}
    </FadingView>
  </TouchableView>
)

Modal.propTypes = {
  overlayStyle: PropTypes.oneOfType([ PropTypes.number, PropTypes.object ]),
  contentStyle: PropTypes.oneOfType([ PropTypes.number, PropTypes.object ]),
  onOverlayPress: PropTypes.func,
  onPressClose: PropTypes.func
}

export default Modal
