import React from 'react'
import PropTypes from 'prop-types'
import { View, Text } from 'react-native'

import createStyles from './styles'

const AlertBox = ({ type, text }) => {
  const styles = createStyles(type)

  const content = this.props.children || (
    <Text style={styles.text}>{text}</Text>
  )

  return <View style={styles.container}>{content}</View>
}

AlertBox.propTypes = {
  type: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
}

export default AlertBox
