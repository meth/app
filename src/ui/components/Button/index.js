import _ from 'lodash'
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
    tooltip: PropTypes.string,
    onPress: PropTypes.func,
    onDisabledPress: PropTypes.func,
    style: PropTypes.oneOfType([ PropTypes.number, PropTypes.array, PropTypes.object ]),
    textStyle: PropTypes.oneOfType([ PropTypes.number, PropTypes.array, PropTypes.object ]),
    onLayout: PropTypes.func,
    onStartHover: PropTypes.func,
    onEndHover: PropTypes.func,
    stateOverride: PropTypes.object,
    childShouldInheritTextStyle: PropTypes.bool,
    childTextStylePropName: PropTypes.string
  }

  static defaultProps = {
    disabled: false,
    type: 'default',
    title: '',
    stateOverride: null,
    childShouldInheritTextStyle: false,
    childTextStylePropName: 'style'
  }

  state = {
    buttonState: 'default'
  }

  render () {
    const { disabled, title, tooltip, type, style, textStyle, onLayout
      , stateOverride, children, childShouldInheritTextStyle, childTextStylePropName } = this.props

    let { buttonState } = this.state
    if (_.get(stateOverride, 'buttonState') !== undefined) {
      ({ buttonState } = stateOverride)
    }

    const styles = createStyles({ type, disabled, buttonState })

    const content = React.Children.count(children) ? (
      React.Children.map(children, child => {
        // if child is a Text or Icon then apply text styles to it
        if (React.isValidElement(child) && childShouldInheritTextStyle) {
          return React.cloneElement(child, {
            [childTextStylePropName]: [].concat(
              styles.text, textStyle, child.props[childTextStylePropName]
            )
          })
        }

        return child
      })
    ) : (
      <Text style={[ styles.text ].concat(textStyle)}>
        {title}
      </Text>
    )

    return (
      <TouchableView
        onLayout={onLayout}
        onStartHover={this.onStartHover}
        onEndHover={this.onEndHover}
        onPress={this.onPress}
        title={tooltip}
        style={[ styles.box ].concat(style)}>
        {content}
      </TouchableView>
    )
  }

  onStartHover = () => {
    const { onStartHover } = this.props

    if (onStartHover) {
      onStartHover()
    }

    this.setState({ buttonState: 'hover' })
  }

  onEndHover = () => {
    const { onEndHover } = this.props

    if (onEndHover) {
      onEndHover()
    }

    this.setState({ buttonState: 'default' })
  }

  onPress = e => {
    const { disabled, onPress, onDisabledPress } = this.props

    if (!disabled) {
      // eslint-disable-next-line no-unused-expressions
      onPress && onPress(e)
    } else {
      // eslint-disable-next-line no-unused-expressions
      onDisabledPress && onDisabledPress(e)
    }
  }
}
