import _ from 'lodash'
import React from 'react'
import { View } from 'react-native'

import API from '../../../../constants/api'
import STATE from '../../../../constants/states'
import {
  globalEvents,
  OPEN_ACTIVE_TAB_DEV_TOOLS,
  OPEN_NEW_TAB,
  CLOSE_TAB,
  EDIT_TAB_URL,
  GOTO_PREVIOUS_TAB,
  GOTO_NEXT_TAB
} from '../../../../env'
import { CachePureComponent } from '../../../helpers/components'
import { connectStore } from '../../../helpers/redux'
import styles from './styles'
import Layout from '../Layout'
import BrowserTabBar from '../../../components/BrowserTabBar'
import BrowserTabView from '../../../components/BrowserTabView'

const newTabId = () => _.random(1, 1000000000)

@connectStore('api')
export default class Browser extends CachePureComponent {
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
        permissions: [ API.CREATE_ACCOUNT ]
      },
      {
        active: false,
        id: newTabId(),
        label: 'Example',
        url: 'https://example.com/',
        permissions: [ API.CREATE_ACCOUNT ]
      }
    ]
  }

  render () {
    const tabs = this.state.tabs.filter(t => t)

    const browserViews = tabs.map(tab => {
      const { id, active, url, permissions } = tab

      return (
        <View key={id} style={active ? styles.activeView : styles.inactiveView}>
          <BrowserTabView
            ref={view => {
              if (active) this.activeTabView = view
            }}
            url={url}
            permissions={permissions}
            apiMethods={this.props.actions}
            onUrlChange={this.cacheBind('onTabUrlChange', id)}
            onLoading={this.cacheBind('onTabStatusChange', id, STATE.LOADING)}
            onLoaded={this.cacheBind('onTabStatusChange', id, STATE.LOADED)}
            onLoadingError={this.cacheBind('onTabStatusChange', id, STATE.ERROR)}
            onTitleChange={this.cacheBind('onTabTitleChange', id)}
            onOpenNewWindow={this.openNewTab}
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
          onNewTab={this.openNewTab}
        />
        <View style={styles.browserViews}>{browserViews}</View>
      </Layout>
    )
  }

  componentDidMount () {
    globalEvents.addListener(OPEN_ACTIVE_TAB_DEV_TOOLS, this.openActiveTabDevTools)
    globalEvents.addListener(OPEN_NEW_TAB, this.openNewTab)
    globalEvents.addListener(CLOSE_TAB, this.closeActiveTab)
    globalEvents.addListener(EDIT_TAB_URL, this.editActiveTabUrl)
    globalEvents.addListener(GOTO_PREVIOUS_TAB, this.gotoPreviousTab)
    globalEvents.addListener(GOTO_NEXT_TAB, this.gotoNextTab)
  }

  componentWillUnmount () {
    globalEvents.removeListener(OPEN_ACTIVE_TAB_DEV_TOOLS, this.openActiveTabDevTools)
    globalEvents.removeListener(OPEN_NEW_TAB, this.openNewTab)
    globalEvents.removeListener(CLOSE_TAB, this.closeActiveTab)
    globalEvents.removeListener(EDIT_TAB_URL, this.editActiveTabUrl)
    globalEvents.removeListener(GOTO_PREVIOUS_TAB, this.gotoPreviousTab)
    globalEvents.removeListener(GOTO_NEXT_TAB, this.gotoNextTab)
  }

  openActiveTabDevTools = () => {
    if (this.activeTabView) {
      this.activeTabView.openDevTools()
    }
  }

  openNewTab = url => {
    const id = newTabId()

    this.state.tabs.push({
      id,
      label: url || 'about:blank',
      url: url || 'about:blank',
      active: true,
      status: STATE.LOADING
    })

    this.onSelectTab(id)
  }

  closeActiveTab = () => {
    const { tabs } = this.state

    const tab = tabs.find(({ active }) => active)

    if (tab) {
      this.onCloseTab(tab.id)
    }
  }

  editActiveTabUrl = () => {
    if (this.activeTabView) {
      this.activeTabView.focusAddressBar()
    }
  }

  gotoNextTab = () => {
    const { tabs } = this.state

    let index = Math.max(0, tabs.findIndex(t => !!t.active))

    index = (tabs.length - 1 === index) ? 0 : index += 1

    this.onSelectTab(tabs[index].id)
  }

  gotoPreviousTab = () => {
    const { tabs } = this.state

    let index = Math.max(0, tabs.findIndex(t => !!t.active))

    index = (0 === index) ? tabs.length - 1 : index -= 1

    this.onSelectTab(tabs[index].id)
  }

  onTabUrlChange = (id, url) => {
    this._updateTabs(t => {
      if (t.id === id) {
        // eslint-disable-next-line no-param-reassign
        t.url = url
      }
    })
  }

  onTabTitleChange = (id, title) => {
    this._updateTabs(t => {
      if (t.id === id) {
        // eslint-disable-next-line no-param-reassign
        t.label = title
      }
    })
  }

  onTabStatusChange = (id, status) => {
    // tab status changes rapidly at times, let's smoothen things out so that
    // we don't update the display too often, by using a timer.
    clearTimeout(this._tabStatusTimer)
    this._tabStatusTimer = setTimeout(() => {
      this._updateTabs(t => {
        if (t.id === id) {
          // eslint-disable-next-line no-param-reassign
          t.status = status
        }
      })
    }, 300)
  }

  onSortTabs = tabs => {
    this.setState({ tabs })
  }

  onSelectTab = id => {
    this._updateTabs(t => {
      // eslint-disable-next-line no-param-reassign
      t.active = t.id === id
    })
  }

  onCloseTab = id => {
    this._filterTabs(t => t.id !== id)
  }

  _updateTabs = cb => {
    const { tabs } = this.state

    tabs.forEach(cb)

    this.setState({
      tabs: [ ...tabs ]
    })
  }

  _filterTabs = cb => {
    const { tabs } = this.state

    const final = []
    let newActiveIndex = -1

    Object.keys(tabs).forEach(index => {
      const tab = tabs[index]

      // if tab should remain
      if (cb(tab)) {
        final.push(tab)
      }
      // if tab was active then we may need to select a new active tab
      else if (tab.active) {
        newActiveIndex = index
      }
    })

    // if another tab should be made "active"
    if (final.length <= newActiveIndex) {
      newActiveIndex = final.length - 1
      // make new tab active
      final[newActiveIndex].active = true
    }

    this.setState({
      tabs: [ ...final ]
    })
  }
}
