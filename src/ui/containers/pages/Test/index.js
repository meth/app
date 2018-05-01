import React, { PureComponent } from 'react'
import { Text } from 'react-native'
import { TabViewAnimated, TabBar } from 'react-native-tab-view'

import { connectStore } from '../../../helpers/redux'
import styles from './styles'
import Layout from '../Layout'

const Overview = () => <Text style={styles.tabContentText}>Overview</Text>
const Transactions = () => <Text style={styles.tabContentText}>Transactions</Text>

@connectStore('nav')
export default class Test extends PureComponent {
  state = {
    index: 0,
    routes: [
      { key: 'overview', title: 'Overview' },
      { key: 'transactions', title: 'Transactions' },
      { key: 'scene3', title: 'Scene 3' }
    ]
  }

  _handleIndexChange = index => this.setState({ index })

  _renderHeader = props => (
    <TabBar
      {...props}
      style={styles.tabBar}
      tabStyle={styles.tab}
      labelStyle={styles.label}
      indicatorStyle={styles.indicator}
    />
  )

  _renderScene = ({ route }) => {
    switch (route.key) {
      case 'overview':
        return <Overview />
      case 'transactions':
        return <Transactions />
      case 'scene3':
        return <Transactions />
      default:
        return null
    }
  }

  _canJumpToTab = tab => (tab.key !== 'scene3')

  render () {
    return (
      <Layout contentStyle={styles.layoutContent}>
        <TabViewAnimated
          swipeEnabled={false}
          animationEnabled={true}
          style={styles.container}
          navigationState={this.state}
          renderScene={this._renderScene}
          renderHeader={this._renderHeader}
          onIndexChange={this._handleIndexChange}
          canJumpToTab={this._canJumpToTab}
        />
      </Layout>
    )
  }
}
