import React, { Component } from 'react'
import { View, Text } from 'react-native'

import { connectRedux } from '../../helpers/decorators'
import styles from './styles'

@connectRedux()
export default class Page extends Component {
  render () {
    return (
      <View style={styles.container}>
        <Text>Woohoo! The browser page</Text>
      </View>
    )
  }
}
