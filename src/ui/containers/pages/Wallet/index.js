import React, { PureComponent } from 'react'
import { Text } from 'react-native'

import { connectStore } from '../../../helpers/redux'
import styles from './styles'
import Layout from '../Layout'

@connectStore('nav')
export default class Wallet extends PureComponent {
  render () {
    return (
      <Layout contentStyle={styles.layoutContent}>
        <Text style={styles.text}>Wallet</Text>
      </Layout>
    )
  }
}
