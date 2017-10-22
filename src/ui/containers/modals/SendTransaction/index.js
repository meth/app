import React, { PureComponent } from 'react'
import { Text, View } from 'react-native'

import { connectStore } from '../../../helpers/redux'
import { getTx } from '../../../../redux/api/selectors'
import { t } from '../../../../../common/strings'
import Modal from '../../../components/Modal'
import Button from '../../../components/Button'
import ErrorBox from '../../../components/ErrorBox'
import styles from './styles'

@connectStore('wallet', 'api', 'modals')
export default class SendTransaction extends PureComponent {
  state = {
    error: null,
    rawTx: null,
    gasPrice: 1,
    gasLimit: null
  }

  render () {
    const { from, to, value, gas, data } = getTx(this.props)

    const { error, rawTx, receipt } = this.state

    const { gasLimit, gasPrice } = this._gas()

    return (
      <Modal>
        <View style={styles.container}>
          <Text>{from}</Text>
          <Text>{to}</Text>
          <Text>{value}</Text>
          <Text>{gasLimit || gas}</Text>
          <Text>{gasPrice}</Text>
          <Text>{data}</Text>
          {receipt ? this.renderReceipt(receipt) : this.renderActions(rawTx)}
          {(!error) ? null : (
            <ErrorBox error={error} />
          )}
        </View>
      </Modal>
    )
  }

  renderReceipt (receipt) {
    return (
      <View>
        <Text>Receipt: {receipt}</Text>
        <Button title={t('button.close')} onPress={this.dismissModal} />
      </View>
    )
  }

  renderActions (rawTx) {
    return rawTx ? (
      <View>
        <Text>{rawTx}</Text>
        <Button title={t('button.confirmAndSendTransaction')} onPress={this.confirmAndSend} />
      </View>
    ) : (
      <Button title={t('button.generateRawTransaction')} onPress={this.generateRaw} />
    )
  }

  confirmAndSend = () => {
    const { rawTx } = this.state

    this.setState({
      error: null
    }, () => {
      this.props.actions.sendRawTransaction(rawTx)
        .then(receipt => {
          this.setState({
            receipt
          })
        })
        .catch(error => {
          this.setState({ error })
        })
    })
  }

  generateRaw = () => {
    const { from, to, value, data } = getTx(this.props)

    const { gasLimit, gasPrice } = this._gas()

    this.setState({
      rawTx: null,
      error: null
    }, () => {
      this.props.actions.generateRawTransaction({
        from, to, value, gasLimit, data, gasPrice
      })
        .then(rawTx => {
          this.setState({
            rawTx
          })
        })
        .catch(error => {
          this.setState({ error })
        })
    })
  }

  dismissModal = () => {
    const { receipt } = this.state

    // only cancel tx if not already succeeded
    if (!receipt) {
      this.props.actions.cancelTransaction(t('error.userCancelledTransaction'))
    } else {
      this.props.actions.hideSendTransactionModal()
    }
  }

  _gas () {
    const { gas } = getTx(this.props)

    return {
      gasLimit: this.state.gasLimit || gas,
      gasPrice: this.state.gasPrice
    }
  }
}
