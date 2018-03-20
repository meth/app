import _ from 'lodash'
import React from 'react'
import { View } from 'react-native'

import DAPP_PERMISSIONS from '../../../../../common/constants/dappPermissions'
import STATE from '../../../../../common/constants/states'
import { createDappId } from '../../../../utils/dapp'
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
import { getDappPermissions } from '../../../../redux/account/selectors'
import styles from './styles'
import Layout from '../Layout'
import BrowserTabBar from '../../../components/BrowserTabBar'
import BrowserTabView from '../../../components/BrowserTabView'

const newTabId = () => _.random(1, 1000000000)

const DEFAULT_PERMISSIONS = {
  [DAPP_PERMISSIONS.ALL_ADDRESSES]: true
}

@connectStore('api', 'modals', 'account')
export default class Browser extends CachePureComponent {
  state = {
    tabs: [
      {
        active: true,
        id: newTabId(),
        label: 'Google',
        url: 'https://google.com/'
      },
      {
        active: false,
        id: newTabId(),
        label: 'Example',
        url: 'https://example.com/'
      }
    ]
  }

  render () {
    const dappPermissions = getDappPermissions(this.props)

    const tabs = this.state.tabs.filter(t => t)

    const browserViews = tabs.map(tab => {
      const { id, active, url } = tab

      return (
        <View key={id} style={active ? styles.activeView : styles.inactiveView}>
          <BrowserTabView
            ref={view => {
              if (active) {
                this.activeTabView = view
              }
            }}
            url={url}
            permissions={dappPermissions[createDappId(tab)] || DEFAULT_PERMISSIONS}
            apiMethods={this.props.actions}
            onUrlChange={this.bind(this.onTabUrlChange, id)}
            onLoading={this.bind(this.onTabStatusChange, id, STATE.LOADING)}
            onLoaded={this.bind(this.onTabStatusChange, id, STATE.LOADED)}
            onLoadingError={this.bind(this.onTabStatusChange, id, STATE.ERROR)}
            onTitleChange={this.bind(this.onTabTitleChange, id)}
            onOpenNewWindow={this.openNewTab}
            editDappPermissions={this.bind(this.onEditPermissions, id)}
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
    globalEvents.on(OPEN_ACTIVE_TAB_DEV_TOOLS, this.openActiveTabDevTools)
    globalEvents.on(OPEN_NEW_TAB, this.openNewTab)
    globalEvents.on(CLOSE_TAB, this.closeActiveTab)
    globalEvents.on(EDIT_TAB_URL, this.editActiveTabUrl)
    globalEvents.on(GOTO_PREVIOUS_TAB, this.gotoPreviousTab)
    globalEvents.on(GOTO_NEXT_TAB, this.gotoNextTab)
  }

  componentWillUnmount () {
    globalEvents.off(OPEN_ACTIVE_TAB_DEV_TOOLS, this.openActiveTabDevTools)
    globalEvents.off(OPEN_NEW_TAB, this.openNewTab)
    globalEvents.off(CLOSE_TAB, this.closeActiveTab)
    globalEvents.off(EDIT_TAB_URL, this.editActiveTabUrl)
    globalEvents.off(GOTO_PREVIOUS_TAB, this.gotoPreviousTab)
    globalEvents.off(GOTO_NEXT_TAB, this.gotoNextTab)
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

  onEditPermissions = id => {
    const { tabs } = this.state
    const tab = tabs.find(t => t.id === id)

    if (tab) {
      const { showDappPermissionsModal } = this.props.actions

      showDappPermissionsModal(createDappId(tab))
    }
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
