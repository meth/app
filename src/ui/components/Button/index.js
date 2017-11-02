import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Text } from 'react-native'

import TouchableView from '../TouchableView'
import createStyles from './styles'

export default class Button extends PureComponent {
  static propTypes = {
    disabled: PropTypes.bool,
    type: PropTypes.string,
    title: PropTypes.string,
    style: PropTypes.number,
    textStyle: PropTypes.number,
    onLayout: PropTypes.func,
    onStartHover: PropTypes.func,
    onEndHover: PropTypes.func
  }

  static defaultProps = {
    disabled: false,
    type: 'default',
    title: ''
  }

  state = {
    hovering: false
  }

  render () {
    const { disabled, title, type, style, textStyle, onLayout, children } = this.props

    const { hovering } = this.state

    const styles = createStyles({ type, disabled, hovering })

    const content =
      0 < React.Children.count(children) ? (
        children
      ) : (
        <Text style={[ styles.text, textStyle ]}>
          {title}
        </Text>
      )

    return (
      <TouchableView
        onLayout={onLayout}
        onStartHover={this.onStartHover}
        onEndHover={this.onEndHover}
        onPress={this.onPress}
        style={[ styles.box, style ]}>
        {content}
      </TouchableView>
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

  onPress = () => {
    const { disabled, onPress, onDisabledPress } = this.props

    if (!disabled) {
      // eslint-disable-next-line no-unused-expressions
      onPress && onPress()
    } else {
      // eslint-disable-next-line no-unused-expressions
      onDisabledPress && onDisabledPress()
    }
  }
}
