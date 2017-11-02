import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity } from 'react-native'

export default class TouchableView extends PureComponent {
  static propTypes = {
    activeOpacity: PropTypes.number,
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
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}>
          {children}
      </TouchableOpacity>
    )
  }

  onMouseEnter = () => {
    this.setState({ hovering: true })
  }

  onMouseLeave = () => {
    this.setState({ hovering: false })
  }
}
