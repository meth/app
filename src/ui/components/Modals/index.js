import React, { PureComponent } from 'react'
import { View } from 'react-native'

import styles from './styles'

export default class Modal extends PureComponent {
  render () {
    return (
      <View style={styles.overlay}>
        {this.props.children}
      </View>
    )
  }
}
