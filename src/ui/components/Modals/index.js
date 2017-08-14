import React, { Component } from 'react'
import { View } from 'react-native'

import styles from './styles'

export default class Modal extends Component {
  render () {
    return (
      <View style={styles.overlay}>
        {this.props.children}
      </View>
    )
  }
}
