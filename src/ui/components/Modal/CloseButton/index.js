import React from 'react'
import PropTypes from 'prop-types'

import IconButton from '../../IconButton'

const ModalCloseButton = ({ style, onPress }) => (
  <IconButton
    style={style}
    icon={{ name: 'close' }}
    onPress={onPress}
  />
)

ModalCloseButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  style: PropTypes.oneOfType([ PropTypes.array, PropTypes.button, PropTypes.number ])
}

export default ModalCloseButton
