import React, { Component } from 'react'
import { TextInput } from 'react-native'

export default class CustomTextInput extends Component {
  render () {
    return (
      <TextInput
        autoCapitalize={'none'}
        autoCorrect={false}
        autoFocus={false}
        autoFocus={false}
        {...this.props}
      />
    )
  }
}
