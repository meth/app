import React from 'react'

import Button from '../Button'
import styles from './styles'

const LinkButton = ({ children, style, textStyle, ...props }) => (
  <Button {...props} style={[ styles.box, style ]} textStyle={[ textStyle, styles.text ]}>
    {children}
  </Button>
)

LinkButton.propTypes = {
  ...Button.propTypes
}

export default LinkButton
