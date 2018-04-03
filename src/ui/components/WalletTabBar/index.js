import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { View, Text } from 'react-native'
import Tabs from 'react-native-tabs'

import styles from './styles'

export default class WalletTabBar extends PureComponent {
  static propTypes = {
    tabs: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired
    })).isRequired,
    selectedTab: PropTypes.string.isRequired,
    onSelectTab: PropTypes.func.isRequired,
    style: PropTypes.any
  }

  render () {
    const { tabs, selectedTab, style } = this.props

    return (
      <View style={[ styles.container, style ]}>
        <Tabs selected={selectedTab} style={styles.tabsContainer} onSelect={this._onSelect}>
          {tabs.map(({ name, label }) => (
            <Text
              key={name}
              name={name}
              style={styles.tabText}
              selectedStyle={styles.selectedTabText}
              >
                {label}
              </Text>
            ))}
          </Tabs>
      </View>
    )
  }

  _onSelect = ({ props: { name } }) => {
    const { onSelectTab } = this.props

    onSelectTab(name)
  }
}
