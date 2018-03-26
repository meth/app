import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Animated } from 'react-native'

export default class FadingView extends PureComponent {
  static propTypes = {
    finalMaxHeight: PropTypes.number,
    duration: PropTypes.number
  }

  static defaultProps = {
    finalMaxHeight: 500,
    duration: 500
  }

  state = {
    growAnim: new Animated.Value(0)
  }

  componentDidMount () {
    Animated.timing(this.state.growAnim, {
      toValue: 1000,
      duration: this.props.duration
    }).start()
  }

  render () {
    const { children, style } = this.props

    const { growAnim } = this.state

    return (
      <Animated.View
        style={[].concat(style).concat({
          overflow: 'hidden',
          maxHeight: growAnim
        })}
      >
        {children}
      </Animated.View>
    )
  }
}
