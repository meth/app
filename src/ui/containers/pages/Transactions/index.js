import React, { PureComponent } from 'react'
import { Text } from 'react-native'

import { connectStore } from '../../../helpers/redux'
import styles from './styles'
import Layout from '../Layout'

@connectStore('nav')
export default class Transactions extends PureComponent {
  render () {
    return (
      <Layout contentStyle={styles.layoutContent}>
        <Text style={styles.intro1Text}>Transactions</Text>
      </Layout>
    )
  }
}
