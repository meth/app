import React, { PureComponent } from 'react'
import { View } from 'react-native'

import { connectStore } from '../../../helpers/redux'
import Header from '../../../components/Header'
import ScrollView from '../../../components/ScrollView'
import { getAddresses } from '../../../../redux/account/selectors'
import { getNodeConnection, getNodeState } from '../../../../redux/node/selectors'
import { getUnseenAlertsCount } from '../../../../redux/log/selectors'
import styles from './styles'

@connectStore('account', 'node', 'log', 'modals')
export default class Layout extends PureComponent {
  render () {
    const { network } = getNodeConnection(this.props)
    if (network) {
      network.node = getNodeState(this.props)
    }
    const addresses = getAddresses(this.props)
    const unseenAlertsCount = getUnseenAlertsCount(this.props)
    const { children, contentStyle } = this.props

    return (
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.container}>
        <Header
          style={styles.header}
          network={network && Object.keys(network).length ? network : null}
          addresses={addresses}
          unseenAlertsCount={unseenAlertsCount}
          onPressNetworkInfo={this.showConnectionInfo}
          onPressAlerts={this.showLog}
        />
        <View style={[ styles.content, contentStyle ]}>
          {children}
        </View>
      </ScrollView>
    )
  }

  showConnectionInfo = () => {
    this.props.actions.showConnectionModal()
  }

  showLog = () => {
    this.props.actions.showLog()
  }
}
