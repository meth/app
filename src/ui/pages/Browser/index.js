import _ from 'lodash'
import React, { PureComponent } from 'react'
import { View } from 'react-native'

import { DAPP_PERMISSIONS, STATE } from '../../../../common/constants'
import styles from './styles'
import Layout from '../Layout'
import BrowserTabBar from '../../components/BrowserTabBar'
import BrowserTabView from '../../components/BrowserTabView'

const newTabId = () => _.random(1, 1000000000)

export default class Page extends PureComponent {
  state = {
    tabs: [
      // {
      //   id: newTabId(),
      //   active: true,
      //   label: 'Mist Wallet',
      //   url: 'https://wallet.ethereum.org/'
      // },
      {
        active: true,
        id: newTabId(),
        label: 'Google',
        url: 'https://google.com/',
        permissions: [DAPP_PERMISSIONS.CREATE_ACCOUNT]
      }
    ]
  }

  render() {
    const { tabs } = this.state

    const browserViews = tabs.map(tab => {
      const { id, active } = tab

      return (
        <View key={id} style={active ? styles.activeView : styles.inactiveView}>
          <BrowserTabView
            {...tab}
            onUrlChange={url => this.onTabUrlChange(id, url)}
            onLoading={() => this.onTabStatusChange(id, STATE.LOADING)}
            onLoaded={() => this.onTabStatusChange(id, STATE.LOADED)}
            onLoadingError={() => this.onTabStatusChange(id, STATE.ERROR)}
            onTitleChange={title => this.onTabTitleChange(id, title)}
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
          onSelect={this.onSelectTab}
          onClose={this.onCloseTab}
          onNewTab={this.onNewTab}
        />
        <View style={styles.browserViews}>{browserViews}</View>
      </Layout>
    )
  }

  onTabUrlChange = (id, url) => {
    this._forEachTab(t => {
      if (t.id === id) {
        t.url = url
      }
    })
  }

  onTabTitleChange = (id, title) => {
    this._forEachTab(t => {
      if (t.id === id) {
        t.label = title
      }
    })
  }

  onTabStatusChange = (id, status) => {
    this._forEachTab(t => {
      if (t.id === id) {
        t.status = status
      }
    })
  }

  onSortTabs = tabs => {
    this.setState({ tabs })
  }

  onSelectTab = id => {
    this._forEachTab(t => {
      t.active = t.id === id
    })
  }

  onCloseTab = id => {
    this._filterTabs(t => t.id !== id)
  }

  onNewTab = url => {
    const id = newTabId()

    this.state.tabs.push({
      id,
      label: url,
      url,
      active: true,
      status: STATE.LOADING
    })

    this.onSelectTab(id)
  }

  _forEachTab = cb => {
    const { tabs } = this.state

    tabs.forEach(cb)

    this.setState({
      tabs: [...tabs]
    })
  }

  _filterTabs = cb => {
    const { tabs } = this.state

    const final = []
    let newActiveIndex = -1

    Object.keys(tabs).forEach(index => {
      const tab = tabs[index]

      // if tab should be removed
      if (!cb(tab)) {
        // if it was active then next active tab is one before it
        if (tab.active) {
          newActiveIndex = index - 1
        }
      } else {
        // tab shouldn' be removed, add it to final list
        final.push(tab)
      }
    })

    // if another tab should be made "active"
    if (-1 < newActiveIndex) {
      // ensure index of new tab to be made active is valid
      while (newActiveIndex >= tabs.length) {
        newActiveIndex -= 1
      }
      // make new tab active
      final[newActiveIndex].active = true
    }

    this.setState({
      tabs: [...final]
    })
  }
}
