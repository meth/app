import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import Button from '../Button'
import Icon from '../Icon'
import createStyles from './styles'

export default class IconButton extends PureComponent {
  static propTypes = {
    icon: PropTypes.shape(Icon.propTypes),
    ...Button.propTypes
  }

  state = {
    hovering: false
  }

  render () {
    const { icon, children, ...props } = this.props
    const { hovering } = this.state
    const styles = createStyles({ ...props, hovering })

    return (
      <Button {...props}
        onStartHover={this.onStartHover}
        onEndHover={this.onEndHover}>
          {children || <Icon {...icon} style={styles.icon} />}
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
