import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Text } from 'react-native'

import TouchableView from '../TouchableView'
import createStyles from './styles'

export default class Button extends PureComponent {
  render () {
    const { disabled, title, type, style, textStyle, onLayout, children } = this.props

    const styles = createStyles({ type, disabled })

    const content =
      0 < React.Children.count(children) ? (
        children
      ) : (
        <Text style={[ styles.text, textStyle ]}>{title}</Text>
      )

    return (
      <TouchableView
        onLayout={onLayout}
        onPress={this.onPress}
        style={[ styles.box, style ]}>
        {content}
      </TouchableView>
    )
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

Button.propTypes = {
  disabled: PropTypes.bool,
  type: PropTypes.string,
  title: PropTypes.string,
  style: PropTypes.number,
  textStyle: PropTypes.number,
  onLayout: PropTypes.func
}

Button.defaultProps = {
  disabled: false,
  type: 'default',
  title: ''
}
