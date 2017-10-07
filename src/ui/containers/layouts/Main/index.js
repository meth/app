import BN from 'bn.js'
import _ from 'lodash'
import React, { PureComponent } from 'react'
import { View, Text } from 'react-native'
import { fromWei } from 'web3-utils'

import { t } from '../../../../common/strings'
import { connectStore, mutable } from '../../helpers/redux'
import controller from '../../../redux/controller'
import TouchableView from '../../components/TouchableView'
import styles from './styles'

@connectStore('wallet')
export default class MainLayout extends PureComponent {
  render () {
    const { children, contentStyle, wallet: { accountBalances } } = mutable(
      this.props
    )

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
                Localhost (Mainnet)
              </Text>
            </TouchableView>
          </View>
        </View>
        <View style={[ styles.content, contentStyle ]}>{children}</View>
      </View>
    )
  }

  onPressConnectionInfo = () => {
    controller.nodes.showConnectionModal()
  }
}
