import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { value } from '../../styles'
import Button from '../Button'
import Loading from '../Loading'

export default class ProgressButton extends PureComponent {
  static propTypes = {
    ...Button.propTypes,
    showInProgress: PropTypes.bool
  }

  static defaultProps = {
    showInProgress: false,
    type: 'default'
  }

  render () {
    const {
      type,
      showInProgress,
      onPress,
      children,
      childShouldInheritTextStyle,
      ...props
    } = this.props

    return (
      <Button
        onPress={showInProgress ? null : onPress}
        type={type}
        childShouldInheritTextStyle={showInProgress ? false : childShouldInheritTextStyle}
        {...props}>
          {(!showInProgress) ? children : (
            <Loading color={value(`$button_${type}_spinnerColor`)} />
          )}
      </Button>
    )
  }
}
