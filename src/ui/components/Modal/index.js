import React from 'react'
import PropTypes from 'prop-types'

import TouchableView from '../TouchableView'
import styles from './styles'

const Modal = ({ children, onOverlayPress, overlayStyle }) => (
  <TouchableView onPress={onOverlayPress} style={[ styles.overlay, overlayStyle ]}>
    {children}
  </TouchableView>
)

Modal.propTypes = {
  overlayStyle: PropTypes.oneOfType([ PropTypes.number, PropTypes.object ]),
  onOverlayPress: PropTypes.func
}

export default Modal
