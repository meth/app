import React, { Component } from 'react'
import { View } from 'react-native'

import { connectRedux } from '../../helpers/decorators'
import styles from './styles'
import Layout from '../Layout'
import BrowserTabBar from '../../components/BrowserTabBar'
import BrowserTabView from '../../components/BrowserTabView'


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

    const browserViews = tabs.map((tab, index) => {
      const { active } = tab

      return (
        <View
          key={index}
          style={active ? styles.activeView : styles.inactiveView}
        >
          <BrowserTabView
            {...tab}
            onUrlChange={url => this.onTabUrlChange(index, url)}
          />
        </View>
      )
    })

    return (
      <Layout contentStyle={styles.layoutContent}>
        <BrowserTabBar
          tabs={tabs}
          onSort={this.onSortTabs}
          onSelect={this.onSelectTab} />
        <View style={styles.browserViews}>
          {browserViews}
        </View>
      </Layout>
    )
  }

  onTabUrlChange = (index, url) => {
    const { tabs } = this.state

    tabs[index].url = url
    tabs[index].label = url

    this.setState({
      tabs: [
        ...tabs
      ]
    })
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
