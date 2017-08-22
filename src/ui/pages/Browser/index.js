import _ from 'lodash'
import React, { PureComponent } from 'react'
import { View } from 'react-native'

import { STATUS } from '../../../../common/constants'
import styles from './styles'
import Layout from '../Layout'
import BrowserTabBar from '../../components/BrowserTabBar'
import BrowserTabView from '../../components/BrowserTabView'


const newTabId = () => _.random(1, 1000000000)



export default class Page extends PureComponent {
  state = {
    tabs: [
      {
        id: newTabId(),
        active: true,
        label: 'Wallet',
        url: 'https://google.com/'
      },
    ],
  }

  render () {
    const { tabs } = this.state

    const browserViews = tabs.map((tab) => {
      const { id, active } = tab

      return (
        <View
          key={id}
          style={active ? styles.activeView : styles.inactiveView}
        >
          <BrowserTabView
            {...tab}
            onUrlChange={url => this.onTabUrlChange(id, url)}
            onLoading={() => this.onTabStatusChange(id, STATUS.LOADING)}
            onLoaded={() => this.onTabStatusChange(id, STATUS.LOADED)}
            onLoadingError={() => this.onTabStatusChange(id, STATUS.ERROR)}
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
        <View style={styles.browserViews}>
          {browserViews}
        </View>
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

  onSortTabs = (tabs) => {
    this.setState({ tabs })
  }

  onSelectTab = (id) => {
    this._forEachTab(t => {
      t.active = (t.id === id)
    })
  }

  onCloseTab = (id) => {
    this._filterTabs(t => t.id !== id)
  }

  onNewTab = (url) => {
    const id = newTabId()

    this.state.tabs.push({
      id,
      label: url,
      url,
      active: true,
      status: STATUS.LOADING,
    })

    this.onSelectTab(id)
  }


  _forEachTab = (cb) => {
    const { tabs } = this.state

    tabs.forEach(cb)

    this.setState({
      tabs: [ ...tabs ]
    })
  }


  _filterTabs = (cb) => {
    let { tabs } = this.state

    tabs = tabs.filter(t => cb(t))

    this.setState({
      tabs: [ ...tabs ]
    })
  }
}
