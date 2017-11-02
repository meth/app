import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity } from 'react-native'

export default class TouchableView extends PureComponent {
  static propTypes = {
    activeOpacity: PropTypes.number,
    onStartHover: PropTypes.func,
    onEndHover: PropTypes.func,
    style: PropTypes.any,
    hoverStyle: PropTypes.any
  }

  static defaultProps = {
    activeOpacity: 1.0
  }

  state = {
    hovering: false
  }

  render () {
    const { children, style, hoverStyle, ...props } = this.props

    const { hovering } = this.state

    return (
      <TouchableOpacity
        style={(hovering && hoverStyle) ? hoverStyle : style}
        {...props}
        onMouseEnter={this.onStartHover}
        onMouseLeave={this.onEndHover}>
          {children}
      </TouchableOpacity>
    )
  }

  onStartHover = () => {
    const { onStartHover } = this.props

    if (onStartHover()) {
      onStartHover()
    }

    this.setState({ hovering: true })
  }

  onEndHover = () => {
    const { onEndHover } = this.props

    if (onEndHover()) {
      onEndHover()
    }

    this.setState({ hovering: false })
  }
}
