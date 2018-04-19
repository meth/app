import React from 'react'
import PropTypes from 'prop-types'
import { View, Text } from 'react-native'

import createStyles from './styles'
import ExpandingView from '../ExpandingView'


const AlertBox = ({ animate, type, text, style, children }) => {
  const styles = createStyles(type)

  const content = children || (
    <Text style={styles.text}>{text}</Text>
  )

  const box = <View style={[ styles.container, style ]}>{content}</View>

  return (!animate) ? box : (
    <ExpandingView {...animate}>{box}</ExpandingView>
  )
}

AlertBox.propTypes = {
  type: PropTypes.string.isRequired,
  animate: PropTypes.shape(ExpandingView.propTypes),
  text: PropTypes.string,
  children: PropTypes.oneOfType([ PropTypes.element, PropTypes.array ]),
  style: PropTypes.oneOfType([ PropTypes.number, PropTypes.object ])
}

AlertBox.defaultProps = {
  animate: null
}

export default AlertBox
