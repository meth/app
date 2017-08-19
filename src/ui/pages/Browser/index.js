import React, { Component } from 'react'
import { View, Text } from 'react-native'

import { connectRedux } from '../../helpers/decorators'
import styles from './styles'
import Layout from '../Layout'
import BrowserTabBar from '../../components/BrowserTabBar'


@connectRedux()
export default class Page extends Component {
  state = {
    tabs: [
      {
        active: true,
        label: 'Wallet',
        url: 'https://meth-wallet.surge.sh/'
      },
      {
        label: 'Contracts',
        url: 'https://meth-wallet.surge.sh/'
      }
    ],
  }

  render () {
    const { tabs } = this.state

    return (
      <Layout contentStyle={styles.layoutContent}>
        <BrowserTabBar tabs={tabs} />
      </Layout>
    )
  }
}
