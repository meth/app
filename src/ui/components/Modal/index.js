import React from 'react'
import PropTypes from 'prop-types'

import CloseButton from './CloseButton'
import TouchableView from '../TouchableView'
import styles from './styles'

const Modal = ({
  children,
  onOverlayPress,
  overlayStyle,
  onPressCloseButton,
  closeButtonStyle
}) => (
  <TouchableView onPress={onOverlayPress} style={[ styles.overlay, overlayStyle ]}>
    {children}
    {onPressCloseButton ? (
      <CloseButton style={closeButtonStyle} onPress={onPressCloseButton} />
    ) : null}
  </TouchableView>
)

Modal.propTypes = {
  overlayStyle: PropTypes.oneOfType([ PropTypes.number, PropTypes.object ]),
  onOverlayPress: PropTypes.func,
  onPressClose: PropTypes.func
}

export default Modal
