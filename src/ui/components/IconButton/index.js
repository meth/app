import _ from 'lodash'
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import Button from '../Button'
import Icon from '../Icon'
import createStyles from './styles'

export default class IconButton extends PureComponent {
  static propTypes = {
    icon: PropTypes.shape(Icon.propTypes),
    iconStyle: PropTypes.any,
    ...Button.propTypes
  }

  state = {
    hovering: false
  }

  render () {
    const { icon, iconStyle, children, stateOverride, ...props } = this.props

    let { hovering } = this.state
    if (_.get(stateOverride, 'hovering')) {
      ({ hovering } = stateOverride)
    }

    const styles = createStyles({ ...props, hovering })

    return (
      <Button {...props}
        stateOverride={stateOverride}
        onStartHover={this.onStartHover}
        onEndHover={this.onEndHover}>
          {children || <Icon {...icon} style={[ styles.icon, iconStyle ]} />}
      </Button>
    )
  }

  onStartHover = () => {
    this.setState({ hovering: true })
  }

  onEndHover = () => {
    this.setState({ hovering: false })
  }
}
