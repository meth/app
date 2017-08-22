import React, { PureComponent } from 'react'
import { TouchableOpacity } from 'react-native'

export default class TouchableView extends PureComponent {
  static defaultProps = {
    activeOpacity: 1.0
  }

  render () {
    const { children, ...props } = this.props

    return (
      <TouchableOpacity {...props}>
        {children}
      </TouchableOpacity>
    )
  }
}
