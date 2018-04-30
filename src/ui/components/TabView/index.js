import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { TabViewAnimated, TabBar } from 'react-native-tab-view'

import styles from './styles'

export default class TabView extends PureComponent {
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

  constructor (props, ctx) {
    super(props, ctx)

    const { initialIndex, routes } = this.props

    this.state = {
      index: initialIndex || 0,
      routes
    }
  }

  componentWillReceiveProps (props) {
    const { routes } = props

    if (routes !== this.state.routes) {
      this.setState({
        index: 0,
        routes
      })
    }
  }

  render () {
    return (
      <TabViewAnimated
        swipeEnabled={false}
        animationEnabled={true}
        navigationState={this.state}
        onIndexChange={this._handleIndexChange}
        renderScene={this._renderScene}
        renderHeader={this._renderHeader}
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

  _renderHeader = headerProps => {
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

  _renderScene = ({ route: { key }, jumpTo, focused }) => {
    const { getScene } = this.props

    // externally accessible
    this.jumpTo = jumpTo

    return focused ? getScene(key) : null
  }

  _canJumpToTab = ({ key }) => {
    const { canJumpToTab } = this.props

    return canJumpToTab(key)
  }
}
