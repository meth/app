import React, { PureComponent } from 'react'
import { View, Text } from 'react-native'

import createStyles from './styles'

export default class AlertBox extends PureComponent {
  render () {
    const { type, text } = this.props

    const styles = createStyles(type)

    const content = this.props.children || (
      <Text style={styles.text}>{text}</Text>
    )

    return (
      <View style={styles.container}>
        {content}
      </View>
    )
  }
}
