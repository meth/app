import React from 'react'
import PropTypes from 'prop-types'
import { View, Text } from 'react-native'

import createStyles from './styles'

const AlertBox = ({ type, text, style, children }) => {
  const styles = createStyles(type)

  const content = children || (
    <Text style={styles.text}>{text}</Text>
  )

  return <View style={[ styles.container, style ]}>{content}</View>
}

AlertBox.propTypes = {
  type: PropTypes.string.isRequired,
  text: PropTypes.string,
  children: PropTypes.oneOfType([ PropTypes.element, PropTypes.array ]),
  style: PropTypes.oneOfType([ PropTypes.number, PropTypes.object ])
}

export default AlertBox
