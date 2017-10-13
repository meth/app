import React from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity } from 'react-native'

const TouchableView = ({ children, ...props }) => (
  <TouchableOpacity {...props}>{children}</TouchableOpacity>
)

TouchableView.propTypes = {
  activeOpacity: PropTypes.number
}

TouchableView.defaultProps = {
  activeOpacity: 1.0
}

export default TouchableView
