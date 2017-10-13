import React from 'react'
import PropTypes from 'prop-types'

import Button from '../Button'
import Icon from '../Icon'
import createStyles from './styles'

const IconButton = ({ icon, ...props }) => {
  const styles = createStyles(props)

  return (
    <Button {...props}>
      <Icon {...icon} style={styles.icon} />
    </Button>
  )
}

IconButton.propTypes = {
  icon: PropTypes.shapeOf(Icon.propTypes),
  ...Button.propTypes
}

export default IconButton
