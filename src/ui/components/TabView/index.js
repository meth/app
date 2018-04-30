import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { TabViewAnimated, TabBar } from 'react-native-tab-view'

import styles from './styles'

export default class TabView extends PureComponent {
  static propTypes = {
    routes: PropTypes.arrayOf(PropTypes.shape({
      key: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired
    })),
    getScene: PropTypes.func.isRequired,
    canJumpToTab: PropTypes.func
  }

  static defaultProps = {
    canJumpToTab: () => true
  }

  constructor (props, ctx) {
    super(props, ctx)

    const { index, routes } = this.props

    this.state = {
      index: index || 0, routes
    }
  }

  componentWillReceiveProps (props) {
    const { index, routes } = props

    if (index !== this.state.index || routes !== this.state.routes) {
      this.setState({
        index: index || 0, routes
      })
    }
  }

  render () {
    return (
      <TabViewAnimated
        swipeEnabled={false}
        animationEnabled={true}
        navigationState={this.state}
        renderScene={this._renderScene}
        renderHeader={this._renderHeader}
        onIndexChange={this._handleIndexChange}
        canJumpToTab={this._canJumpToTab}
      />
    )
  }

  _handleIndexChange = index => this.setState({ index })

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

  _renderScene = ({ route: { key }, focused }) => {
    const { getScene } = this.props

    return focused ? getScene(key) : null
  }

  _canJumpToTab = ({ key }) => {
    const { canJumpToTab } = this.props

    return canJumpToTab(key)
  }
}
