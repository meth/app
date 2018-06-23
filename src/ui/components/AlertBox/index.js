import React from 'react'
import PropTypes from 'prop-types'
import { View, Text } from 'react-native'

import createStyles from './styles'
import Icon from '../Icon'
import ExpandingView from '../ExpandingView'


const ICON = {
  info: 'info-circle',
  warn: 'exclamation-triangle',
  error: 'error-outline'
}


const AlertBox = ({ animate, type, text, style, children }) => {
  const styles = createStyles(type)

  const content = children || (
    <React.Fragment>
      <Icon name={ICON[type]} style={styles.icon} />
      <Text style={styles.text}>{text}</Text>
    </React.Fragment>
  )

  const box = <View style={[ styles.container ].concat(style)}>{content}</View>

  return (!animate) ? box : (
    <ExpandingView {...animate}>{box}</ExpandingView>
  )
}

AlertBox.propTypes = {
  type: PropTypes.string.isRequired,
  animate: PropTypes.shape(ExpandingView.propTypes),
  text: PropTypes.string,
  children: PropTypes.oneOfType([ PropTypes.element, PropTypes.array ]),
  style: PropTypes.any
}

AlertBox.defaultProps = {
  animate: null
}

export default AlertBox
