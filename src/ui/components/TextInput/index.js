import React, { PureComponent } from 'react'
import { TextInput } from 'react-native'

export default class CustomTextInput extends PureComponent {
  render() {
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
