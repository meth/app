import _ from 'lodash'
import React, { Component } from 'react'
import { View } from 'react-native'

import { STATUS } from '../../../../common/constants'
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
        url: 'https://google.com/'
      },
      // {
      //   label: 'Contracts',
      //   url: 'https://google.com/'
      // },
      // {
      //   label: 'Addresses',
      //   url: 'https://google.com/'
      // }
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
            onLoading={() => this.onTabStatusChange(index, STATUS.LOADING)}
            onLoaded={() => this.onTabStatusChange(index, STATUS.LOADED)}
            onLoadingError={() => this.onTabStatusChange(index, STATUS.ERROR)}
            onTitleChange={title => this.onTabTitleChange(index, title)}
            onOpenNewWindow={this.onNewTab}
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

    this.setState({
      tabs: [ ...tabs ]
    })
  }

  onTabTitleChange = (index, title) => {
    const { tabs } = this.state

    tabs[index].label = _.trim(title || '')

    this.setState({
      tabs: [ ...tabs ]
    })
  }

  onTabStatusChange = (index, status) => {
    const { tabs } = this.state

    tabs[index].status = status

    this.setState({
      tabs: [ ...tabs ]
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
      tabs: [ ...tabs ]
    })
  }

  onNewTab = (url) => {
    const { tabs } = this.state

    tabs.forEach(t => {
      t.active = false
    })

    tabs.push({
      label: url,
      url,
      active: true,
      status: STATUS.LOADING,
    })

    this.setState({
      tabs: [ ...tabs ]
    })
  }
}
