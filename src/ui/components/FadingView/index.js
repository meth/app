import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Animated } from 'react-native'

export default class FadingView extends PureComponent {
  static propTypes = {
    duration: PropTypes.number,
    onPress: PropTypes.func
  }

  static defaultProps = {
    duration: 350
  }

  state = {
    fadeAnim: new Animated.Value(0)
  }

  componentDidMount () {
    Animated.timing(this.state.fadeAnim, {
      toValue: 1,
      duration: this.props.duration
    }).start()
  }

  render () {
    const { children, style } = this.props

    const { fadeAnim } = this.state

    return (
      <Animated.View
        style={[].concat(style).concat({
          opacity: fadeAnim
        })}
      >
        {children}
      </Animated.View>
    )
  }
}
