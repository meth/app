import React, { PureComponent } from 'react'
import { TextInput as NativeTextInput } from 'react-native'

import createStyles from './styles'

export default class CustomTextInput extends PureComponent {
  static propTypes = NativeTextInput.propTypes

  state = {
    fieldState: 'blurred'
  }

  render () {
    const {
      value,
      disabled,
      onChange,
      onSubmit,
      error,
      style,
      ...props
    } = this.props

    const { fieldState } = this.state

    const { styles, placeholderTextColor } = createStyles(fieldState)

    let inputStyle
    if (disabled) {
      inputStyle = [ styles.disabled ].concat(style)
    } else if (error) {
      inputStyle = [ styles.error ].concat(style)
    } else {
      inputStyle = [ styles.normal ].concat(style)
    }

    return (
      <NativeTextInput
        autoCapitalize={'none'}
        autoCorrect={false}
        autoFocus={false}
        {...props}
        disabled={disabled}
        value={value}
        style={inputStyle}
        ref={this._onRef}
        onChangeText={onChange}
        onFocus={this._onFocus}
        onBlur={this._onBlur}
        onSubmitEditing={onSubmit}
        underlineColorAndroid='rgba(0,0,0,0)'
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
