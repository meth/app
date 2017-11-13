import React, { PureComponent } from 'react'
import { TextInput } from 'react-native'

import createStyles from './styles'

export default class Field extends PureComponent {
  state = {
    fieldState: 'blurred'
  }

  render () {
    const { style, ...props } = this.props

    const { fieldState } = this.state

    const { styles, placeholderTextColor } = createStyles(fieldState)

    return (
      <TextInput
        ref={input => { this.textInput = input }}
        style={[ styles.input, style ]}
        autoCapitalize={'none'}
        autoCorrect={false}
        autoFocus={false}
        {...props}
        placeholderTextColor={placeholderTextColor}
        onBlur={this.onBlur}
        onFocus={this.onFocus}
      />
    )
  }

  onBlur = () => {
    this.setState({
      fieldState: 'blurred'
    })
  }

  onFocus = () => {
    this.setState({
      fieldState: 'focussed'
    })
  }

  focusHighlight () {
    if (this.textInput) {
      this.textInput.focus()
    }
  }
}
