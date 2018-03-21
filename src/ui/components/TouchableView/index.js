import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity, View } from 'react-native'

export default class TouchableView extends PureComponent {
  static propTypes = {
    activeOpacity: PropTypes.number,
    onPress: PropTypes.func,
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
    const {
      children,
      style,
      hoverStyle,
      onPress,
      onStartHover,
      onEndHover,
      activeOpacity,
      ...props
    } = this.props

    const { hovering } = this.state

    const ViewComponent = onPress ? TouchableOpacity : View

    return (
      <ViewComponent
        style={(hovering && hoverStyle) ? hoverStyle : style}
        {...props}
        {...((!onPress) ? null : {
          activeOpacity,
          onPress,
          onMouseEnter: this.onStartHover,
          onMouseLeave: this.onEndHover
        })}>
          {children}
      </ViewComponent>
    )
  }

  onStartHover = () => {
    const { onStartHover } = this.props

    if (onStartHover) {
      onStartHover()
    }

    this.setState({ hovering: true })
  }

  onEndHover = () => {
    const { onEndHover } = this.props

    if (onEndHover) {
      onEndHover()
    }

    this.setState({ hovering: false })
  }
}
