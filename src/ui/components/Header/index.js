import BN from 'bn.js'
import _ from 'lodash'
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { View, Text } from 'react-native'
import { fromWei } from 'web3-utils'

import TouchableView from '../TouchableView'
import styles from './styles'

export default class Header extends PureComponent {
  static propTypes = {
    networkInfo: PropTypes.object.isRequired,
    accountBalances: PropTypes.object.isRequired,
    style: PropTypes.any,
    onPressNetworkInfo: PropTypes.func
  }

  render () {
    const { networkInfo, appName, style } = this.props

    return (
      <View style={style}>
        <View style={styles.left}>
          <Text style={styles.appNameText}>{appName}</Text>
        </View>
        <View style={styles.right}>
          {networkInfo ? this.renderEther() : null}
          {networkInfo ? this.renderNetwork() : null}
          {this.renderAlerts()}
          {networkInfo ? this.renderLogoutButton() : null}
        </View>
      </View>
    )
  }

  renderEther () {
    const { accountBalances } = this.props
    const totalWei = _.reduce(accountBalances, (m, v) => m.add(v), new BN(0, 2))
    const totalEther = fromWei(totalWei, 'ether')

    return (
      <TouchableView
        style={styles.section}
        hoverStyle={styles.sectionHover}>
          <Text style={styles.etherBalanceText}>{totalEther} ETH</Text>
      </TouchableView>
    )
  }

  renderNetwork () {
    const { networkInfo } = this.props

    return (
      <TouchableView style={styles.section}
        style={styles.section}
        hoverStyle={styles.sectionHover}>
          <Text style={styles.networkInfoText}>
            {networkInfo.description}
          </Text>
      </TouchableView>
    )
  }

  renderAlerts () {
    return (
      <TouchableView
        style={styles.section}
        hoverStyle={styles.sectionHover}>
          <IconButton icon={{ name: 'bell-o' }} />
      </TouchableView>
    )
  }

  renderLogoutButton () {
    return (
      <TouchableView
        style={styles.section}
        hoverStyle={styles.sectionHover}>
          <IconButton icon={{ name: 'sign-out' }} />
      </TouchableView>
    )
  }

  showConnection = () => {
    this.props.actions.showConnectionModal()
  }
}
