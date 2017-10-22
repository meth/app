import BN from 'bn.js'
import _ from 'lodash'
import React, { PureComponent } from 'react'
import { View, Text } from 'react-native'
import { fromWei } from 'web3-utils'

import { t } from '../../../../../common/strings'
import { connectStore } from '../../../helpers/redux'
import { getAccountBalances } from '../../../../redux/wallet/selectors'
import { getNetworkInfo } from '../../../../redux/node/selectors'
import TouchableView from '../../../components/TouchableView'
import styles from './styles'

@connectStore('wallet', 'node')
export default class Layout extends PureComponent {
  render () {
    const { children, contentStyle } = this.props
    const accountBalances = getAccountBalances(this.props)
    const networkInfo = getNetworkInfo(this.props)

    const totalWei = _.reduce(accountBalances, (m, v) => m.add(v), new BN(0, 2))
    const totalEther = fromWei(totalWei, 'ether')

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.headerAppNameText}>{t('appName')}</Text>
          </View>
          <View style={styles.headerRight}>
            <Text style={styles.headerBalanceText}>{totalEther} ETH</Text>
            <TouchableView onPress={this.onPressConnectionInfo}>
              <Text style={styles.headerConnectionText}>
                {networkInfo.description}
              </Text>
            </TouchableView>
          </View>
        </View>
        <View style={[ styles.content, contentStyle ]}>{children}</View>
      </View>
    )
  }

  onPressConnectionInfo = () => {
    this.props.actions.showConnectionModal()
  }
}
