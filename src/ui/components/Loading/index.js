import React, { Component } from 'react'
import { ActivityIndicator } from 'react-native'

export default class Loading extends Component {
  render () {
    return (
      <ActivityIndicator size='small' />
    )
  }
}
