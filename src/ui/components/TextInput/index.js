import React, { PureComponent } from 'react'
import { TextInput as NativeTextInput } from 'react-native'

import createStyles from './styles'

export default class CustomTextInput extends PureComponent {
  state = {
    fieldState: 'blurred'
  }

  render () {
    const {
      value,
      onChange,
      onSubmit,
      error,
      style,
      errorStyle,
      ...props
    } = this.props

    const { fieldState } = this.state

    const { styles, placeholderTextColor } = createStyles(fieldState)

    const inputStyle = (error)
      ? [ styles.error ].concat(errorStyle)
      : [ styles.normal ].concat(style)

    return (
      <NativeTextInput
        autoCapitalize={'none'}
        autoCorrect={false}
        autoFocus={false}
        {...props}
        value={value}
        style={inputStyle}
        ref={this._onRef}
        onChangeText={onChange}
        onFocus={this._onFocus}
        onBlur={this._onBlur}
        onSubmitEditing={onSubmit}
        placeholderTextColor={placeholderTextColor}
      />
    )
  }

  _onRef = input => {
    this.textInput = input
  }

  _onBlur = () => {
    this.setState({
      fieldState: 'blurred'
    })
  }

  _onFocus = () => {
    this.setState({
      fieldState: 'focussed'
    })
  }

  focus () {
    if (this.textInput) {
      this.textInput.focus()
    }
  }

  unfocus () {
    if (this.textInput) {
      this.textInput.blur()
    }
  }

  getValue () {
    return this.props.value
  }
}
