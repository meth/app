import React, { Component } from 'react'
import { View, Text } from 'react-native'

// import dispatcher from '../../../redux/dispatcher'
import { connectRedux } from '../../helpers/decorators'
import styles from './styles'

@connectRedux()
export default class Page extends Component {
  render () {
    return (
      <View style={styles.container}>
        <View style={styles.enterContainer}>
          <Text>Enter mnemonic</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.generateContainer}>
          <Text>Generate mnemonic</Text>
        </View>
      </View>
    )
  }

  componentDidUpdate () {
    // if (this.props.store.config.nodes) {
    //   dispatcher.nav.reset('login')
    // }
  }
}
