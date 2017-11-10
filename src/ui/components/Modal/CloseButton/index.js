import React from 'react'
import PropTypes from 'prop-types'

import IconButton from '../../IconButton'
import styles from './styles'

const ModalCloseButton = ({ style, onPress }) => (
  <IconButton
    style={[ styles.button, style ]}
    icon={{ name: 'close' }}
    onPress={onPress}
  />
)

ModalCloseButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  style: PropTypes.oneOfType([ PropTypes.button, PropTypes.number ])
}

export default ModalCloseButton
