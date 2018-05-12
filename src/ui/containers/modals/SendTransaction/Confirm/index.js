import React, { PureComponent } from 'react'
import { Text, View } from 'react-native'

import { connectStore } from '../../../../helpers/redux'
import { t } from '../../../../../../common/strings'
import styles from './styles'
import formStyles from '../../../../styles/forms'
import ErrorBox from '../../../../components/ErrorBox'
import ProgressButton from '../../../../components/ProgressButton'
import BlockOfText from '../../../../components/BlockOfText'
import { getMaxCost } from '../utils'


@connectStore('account')
export default class Confirm extends PureComponent {
  state = {
    error: null,
    submitting: false
  }

  render () {
    const {
      rawTx,
      params: { from, to, amount, unit, gasLimit, gasPrice }
    } = this.props

    const { error, submitting } = this.state

    return (
      <View style={styles.container}>
        <View style={styles.rawTransaction}>
          <Text style={formStyles.labelText}>{t('modal.sendTransaction.field.fromLabel')}</Text>
          <Text style={styles.confirmText}>{from}</Text>
          <Text style={formStyles.labelText}>{t('modal.sendTransaction.field.toLabel')}</Text>
          <Text style={styles.confirmText}>{to || t('modal.sendTransaction.contractDeployment')}</Text>
          <Text style={formStyles.labelText}>{t('modal.sendTransaction.field.amountLabel')}</Text>
          <Text style={styles.confirmText}>{amount} {unit}</Text>
          <Text style={formStyles.labelText}>{t('modal.sendTransaction.maxCost')}</Text>
          <Text style={styles.confirmText}>{getMaxCost({ amount, unit, gasLimit, gasPrice })}</Text>
          <Text style={formStyles.labelText}>{t('modal.sendTransaction.rawTransactionLabel')}</Text>
          <BlockOfText
            text={rawTx.str}
            style={styles.rawTransactionBlock}
            textStyle={styles.rawTransactionBlockText}
          />
          <ProgressButton
            showInProgress={submitting}
            title={t('button.confirmAndSendTransaction')}
            onPress={this._confirmAndSendRawTransaction}
            style={styles.rawTransactionButton}
          />
          <ErrorBox error={error} style={styles.errorBox} />
        </View>
      </View>
    )
  }

  _confirmAndSendRawTransaction = () => {
    const { rawTx } = this.props
    const { sendRawTransaction } = this.props.actions

    this.setState({
      error: null,
      submitting: true
    }, () => {
      sendRawTransaction(rawTx)
        .then(txId => {
          this.setState({
            submitting: false
          }, () => {
            const { onSentTransaction } = this.props

            onSentTransaction(txId)
          })
        })
        .catch(error => {
          this.setState({
            submitting: false,
            error
          })
        })
    })
  }
}
