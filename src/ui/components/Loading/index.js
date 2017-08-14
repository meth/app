import React, { Component } from 'react'
import { Text } from 'react-native'

import styles from './styles'

export default class Loading extends Component {
  render () {
    return (
      <Text style={styles.text}>Loading...</Text>
    )
  }
}
