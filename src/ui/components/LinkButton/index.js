import React from 'react'

import Button from '../Button'
import styles from './styles'

const LinkButton = ({ style, textStyle, ...props }) => (
  <Button {...props} style={[ styles.box, style ]} textStyle={[ textStyle, styles.text ]} type='link' />
)

LinkButton.propTypes = {
  ...Button.propTypes
}

export default LinkButton
