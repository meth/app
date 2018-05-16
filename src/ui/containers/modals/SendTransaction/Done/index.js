import React, { PureComponent } from 'react'
import { Text, View } from 'react-native'

import { connectStore } from '../../../../helpers/redux'
import { t } from '../../../../../../common/strings'
import Loading from '../../../../components/Loading'
import { routes } from '../../../../nav'
import styles from './styles'
import TransactionId from '../../../liveComponents/TransactionView/TransactionId'
import TransactionReceipt from '../../../liveComponents/TransactionView/TransactionReceipt'
import Button from '../../../../components/Button'


@connectStore('account')
export default class Done extends PureComponent {
  render () {
    const { txId } = this.props
    const { getTransactionHistory } = this.props.selectors

    const transactions = getTransactionHistory()
    const tx = transactions.find(({ id }) => id === txId)

    return (
      <View style={styles.container}>
        <View style={styles.txConfirmation}>
          <Text style={styles.txConfirmationIntroText}>
            {t('modal.sendTransaction.transactionSent')}
          </Text>
          {tx ? (
            <View style={styles.txConfirmationContent}>
              <TransactionId
                tx={tx}
                style={styles.txConfirmationId}
                textStyle={styles.txConfirmationIdText}
              />
              <TransactionReceipt tx={tx} style={styles.txConfirmationReceipt} />
            </View>
          ) : (
            <Loading />
          )}
          <Button
            style={styles.trackTransactionButton}
            title={t('button.viewTransactions')}
            onPress={this._onPressTrackTransaction}
          />
        </View>
      </View>
    )
  }

  _onPressTrackTransaction = () => {
    const { hideSendTransactionModal, navGo } = this.props.actions

    hideSendTransactionModal()

    navGo(routes.Transactions.path)
  }
}
