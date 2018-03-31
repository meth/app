import React, { PureComponent } from 'react'
import { View, Text } from 'react-native'

import { connectStore } from '../../../helpers/redux'
import { getAccounts } from '../../../../redux/account/selectors'
import { t } from '../../../../../common/strings'
import styles from './styles'
import Layout from '../Layout'
import TitleText from '../../../components/TitleText'
import ScrollView from '../../../components/ScrollView'


@connectStore('account')
export default class Wallet extends PureComponent {
  render () {
    const accounts = getAccounts(this.props)

    const accountAddresses = Object.keys(accounts)

    return (
      <Layout contentStyle={styles.layoutContent}>
        <TitleText text={t('title.wallet')} />
        <ScrollView
          style={styles.cardsScrollView}
          contentContainerStyle={styles.cardsContent}
          horizontal={true}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={true}
        >
          {accountAddresses.map(address => (
            <View key={address} style={styles.card}>
              <Text style={styles.cardText}>{address}</Text>
            </View>
          ))}
        </ScrollView>
      </Layout>
    )
  }
}
