import React, { PureComponent } from 'react'
import { View } from 'react-native'

import { t } from '../../../../../common/strings'
import { connectStore } from '../../../helpers/redux'
import Header from '../../../components/Header'
import { getAccountBalances } from '../../../../redux/wallet/selectors'
import { getNetworkInfo } from '../../../../redux/node/selectors'
import styles from './styles'

@connectStore('wallet', 'node')
export default class Layout extends PureComponent {
  render () {
    const networkInfo = getNetworkInfo(this.props)
    const accountBalances = getAccountBalances(this.props)
    const { children, contentStyle } = this.props

    return (
      <View style={styles.container}>
        <Header
          style={styles.header}
          networkInfo={networkInfo}
          accountBalances={accountBalances}
          appName={t('appName')}
        />
        <View style={[ styles.content, contentStyle ]}>{children}</View>
      </View>
    )
  }

  showConnection = () => {
    this.props.actions.showConnectionModal()
  }
}
