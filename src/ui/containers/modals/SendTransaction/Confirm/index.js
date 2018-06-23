import _ from 'lodash'
import React, { PureComponent } from 'react'
import { Text, View } from 'react-native'

import { connectStore } from '../../../../helpers/redux'
import { t } from '../../../../../../common/strings'
import styles from './styles'
import formStyles from '../../../../styles/forms'
import ErrorBox from '../../../../components/ErrorBox'
import ProgressButton from '../../../../components/ProgressButton'
import ScrollView from '../../../../components/ScrollView'
import BlockOfText from '../../../../components/BlockOfText'
import ConfirmPinModal from '../../../../components/ConfirmPinModal'
import { getMaxCostEthWithSuffixStr } from '../utils'


@connectStore('account', 'config')
export default class Confirm extends PureComponent {
  state = {
    error: null,
    submitting: false
  }

  componentDidUpdate (oldProps) {
    // clear the error if a new raw tx has been generated
    if (this.props.rawTx !== oldProps.rawTx) {
      this.setState({
        error: null
      })
    }
  }

  render () {
    const {
      rawTx,
      params: { from, to, amount, unit, gasLimit, gasPrice }
    } = this.props

    const { error, submitting } = this.state

    return (
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.rawTransaction}>
          <Text style={formStyles.labelText}>{t('modal.sendTransaction.field.fromLabel')}</Text>
          <Text style={styles.confirmText}>{from}</Text>
          <Text style={formStyles.labelText}>{t('modal.sendTransaction.field.toLabel')}</Text>
          <Text style={styles.confirmText}>{to || t('modal.sendTransaction.contractDeployment')}</Text>
          <Text style={formStyles.labelText}>{t('modal.sendTransaction.field.amountLabel')}</Text>
          <Text style={styles.confirmText}>{amount} {unit}</Text>
          <Text style={formStyles.labelText}>{t('modal.sendTransaction.maxCost')}</Text>
          <Text style={styles.confirmText}>
            {getMaxCostEthWithSuffixStr({ amount, unit, gasLimit, gasPrice })}
          </Text>
          <Text style={formStyles.labelText}>{t('modal.sendTransaction.rawTransactionLabel')}</Text>
          <BlockOfText
            text={_.get(rawTx, 'str', '')}
            blockStyle={styles.rawTransactionBlock}
            blockTextStyle={styles.rawTransactionBlockText}
          />
          <ProgressButton
            showInProgress={submitting}
            title={t('button.confirmAndSendTransaction')}
            onPress={this._confirm}
            style={styles.rawTransactionButton}
          />
          <ErrorBox error={error} style={styles.errorBox} />
        </View>
        <ConfirmPinModal
          ref={this._onConfirmModalRef}
          title={t('modal.confirmPin.pleaseEnterPinToConfirmTransaction')}
          onSuccess={this._onConfirmed}
          onCancel={this._onNotConfirmed}
        />
      </ScrollView>
    )
  }

  _onConfirmModalRef = ref => {
    this.confirmModal = ref
  }

  _confirm = () => {
    const { getSecurityPin } = this.props.selectors

    this.confirmModal.show(getSecurityPin())
  }

  _onNotConfirmed = () => {}

  _onConfirmed = () => {
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
