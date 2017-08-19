import React, { Component } from 'react'

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
        url: 'https://wallet.ethereum.org/'
      },
      {
        label: 'Contracts',
        url: 'https://contracts.com/'
      },
      {
        label: 'Addresses',
        url: 'https://addresses.com/'
      }
    ],
  }

  render () {
    const { tabs } = this.state

    return (
      <Layout contentStyle={styles.layoutContent}>
        <BrowserTabBar
          tabs={tabs}
          onSort={this.onSortTabs}
          onSelect={this.onSelectTab} />
      </Layout>
    )
  }

  onSortTabs = (tabs) => {
    this.setState({ tabs })
  }

  onSelectTab = (index) => {
    const { tabs } = this.state

    tabs.forEach(t => {
      t.active = false
    })

    tabs[index].active = true

    this.setState({
      tabs: [
        ...tabs
      ]
    })
  }
}
