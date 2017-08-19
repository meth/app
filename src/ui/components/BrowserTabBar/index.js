import React, { Component } from 'react'
import { View, Text } from 'react-native'

import styles from './styles'



export default class TabBar extends Component {
  render () {
    return (
      <View style={styles.container}>
        {this.renderTabs()}
      </View>
    )
  }

  renderTabs () {
    const { tabs } = this.props

    return tabs.map(({ label, active }) => (
      <View style={[styles.tab, active ? styles.activeTab : null]} key={label}>
        <Text style={[styles.tabText, active ? styles.activeTabText : null]}>{label}</Text>
      </View>
    ))
  }
}
