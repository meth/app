import React from 'react'
import PropTypes from 'prop-types'

import TouchableView from '../TouchableView'
import styles from './styles'

const Modal = ({ children, onOverlayPress }) => (
  <TouchableView onPress={onOverlayPress} style={styles.overlay}>
    {children}
  </TouchableView>
)

Modal.propTypes = {
  onOverlayPress: PropTypes.func
}

export default Modal
