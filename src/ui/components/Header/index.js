import BN from 'bn.js'
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { View, Text } from 'react-native'
import { fromWei } from 'web3-utils'

import TouchableView from '../TouchableView'
import IconButton from '../IconButton'
import styles from './styles'

export default class Header extends PureComponent {
  static propTypes = {
    networkInfo: PropTypes.object.isRequired,
    accountBalances: PropTypes.object.isRequired,
    onPressNetworkInfo: PropTypes.func.isRequired,
    style: PropTypes.any
  }

  render () {
    const { networkInfo, appName, style } = this.props

    return (
      <View style={[ styles.container, style ]}>
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
    const totalWei = Object.values(accountBalances).reduce((m, v) => m.add(v), new BN(0, 2))
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
      <View style={styles.alert}>
        <IconButton
          style={styles.iconButton}
          type='header'
          icon={{ name: 'bell-o' }} />
      </View>
    )
  }

  renderLogoutButton () {
    return (
      <View style={styles.logout}>
        <IconButton
          style={styles.iconButton}
          type='header'
          icon={{ name: 'sign-out' }} />
      </View>
    )
  }

  showConnection = () => {
    this.props.actions.showConnectionModal()
  }
}
