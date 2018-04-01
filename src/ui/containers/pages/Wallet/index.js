import React from 'react'

import { CachePureComponent } from '../../../helpers/components'
import { connectStore } from '../../../helpers/redux'
import { getAccounts } from '../../../../redux/account/selectors'
import { t } from '../../../../../common/strings'
import styles from './styles'
import Layout from '../Layout'
import TitleText from '../../../components/TitleText'
import ScrollView from '../../../components/ScrollView'
import WalletCard from '../../../components/WalletCard'
import Button from '../../../components/Button'


@connectStore('account')
export default class Wallet extends CachePureComponent {
  state = {
    activeCard: 0
  }

  render () {
    const accounts = getAccounts(this.props)

    const accountAddresses = Object.keys(accounts)

    const { activeCard } = this.state

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
          {accountAddresses.map((address, index) => (
            <Button
              type='walletCard'
              key={address}
              style={[ styles.cardButton, activeCard === index ? styles.cardButtonActive : null ]}
              stateOverride={{
                hovering: activeCard === index
              }}
              onPress={this.bind(this._onSelectCard, index)}
            >
              <WalletCard
                style={styles.card}
                account={{
                  address,
                  ...accounts[address]
                }}
                active={activeCard === index}
              />
            </Button>
          ))}
        </ScrollView>
      </Layout>
    )
  }

  _onSelectCard = activeCard => this.setState({ activeCard })
}
