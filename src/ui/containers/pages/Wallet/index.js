import React, { PureComponent } from 'react'
import { Text } from 'react-native'

import styles from './styles'
import Layout from '../Layout'

export default class Wallet extends PureComponent {
  render () {
    return (
      <Layout contentStyle={styles.layoutContent}>
        <Text style={styles.text}>Wallet</Text>
      </Layout>
    )
  }
}
