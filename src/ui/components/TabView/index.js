import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { TabView, TabBar } from 'react-native-tab-view'

import styles from './styles'

export default class TabViewAnimated extends PureComponent {
  static propTypes = {
    initialIndex: PropTypes.number,
    routes: PropTypes.arrayOf(PropTypes.shape({
      key: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired
    })),
    getScene: PropTypes.func.isRequired,
    canJumpToTab: PropTypes.func
  }

  static defaultProps = {
    initialIndex: 0,
    canJumpToTab: () => true
  }

  state = {
    index: this.props.initialIndex,
    routes: this.props.routes
  }

  render () {
    return (
      <TabView
        swipeEnabled={false}
        animationEnabled={true}
        navigationState={this.state}
        onIndexChange={this._handleIndexChange}
        renderScene={this._renderScene}
        renderTabBar={this._renderTabBar}
        onIndexChange={this._handleIndexChange}
        canJumpToTab={this._canJumpToTab}
      />
    )
  }

  _handleIndexChange = index => {
    const { onIndexChange } = this.props

    this.setState({ index }, () => {
      if (onIndexChange) {
        onIndexChange(index)
      }
    })
  }

  _renderTabBar = headerProps => {
    const { tabBarStyle, tabStyle, labelTextStyle, indicatorStyle } = this.props

    return (
      <TabBar
        {...headerProps}
        style={[ styles.tabBar ].concat(tabBarStyle)}
        tabStyle={[ styles.tab ].concat(tabStyle)}
        labelStyle={[ styles.label ].concat(labelTextStyle)}
        indicatorStyle={[ styles.indicator ].concat(indicatorStyle)}
      />
    )
  }

  _renderScene = ({ route: { key }, navigationState: { index, routes }, jumpTo }) => {
    // make function externally accessible
    this.jumpTo = jumpTo

    const { getScene } = this.props

    return getScene(key, (key === routes[index].key))
  }

  _canJumpToTab = ({ key }) => {
    const { canJumpToTab } = this.props

    return canJumpToTab(key)
  }
}
