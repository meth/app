import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import Button from '../Button'
import Icon from '../Icon'

export default class IconButton extends PureComponent {
  static propTypes = {
    icon: PropTypes.shape(Icon.propTypes),
    ...Button.propTypes
  }

  render () {
    const { icon, children, ...props } = this.props

    return (
      <Button {...props}>
        {children || <Icon {...icon} />}
      </Button>
    )
  }
}
