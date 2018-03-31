import React from 'react'
import PropTypes from 'prop-types'

import { value } from '../../styles'
import Button from '../Button'
import Loading from '../Loading'

const ProgressButton = ({ type, showInProgress, onPress, children, ...props }) => {
  const content = (!showInProgress) ? children : (
    <Loading color={value(`$button_${type}_spinnerColor`)} />
  )

  return (
    <Button
      onPress={showInProgress ? null : onPress}
      type={type}
      {...props}>
        {content}
    </Button>
  )
}

ProgressButton.propTypes = {
  ...Button.propTypes,
  showInProgress: PropTypes.bool
}

ProgressButton.defaultProps = {
  showInProgress: false,
  type: 'default'
}

export default ProgressButton
