import React, { PureComponent } from 'react'
import { Text, View } from 'react-native'

import { connectStore } from '../../../helpers/redux'
import { getTx } from '../../../../redux/api/selectors'
import { t } from '../../../../../strings'
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
    const { error, rawTx, receipt } = this.state

    return (
      <Modal>
        <View style={styles.container}>
          {receipt ? this.renderReceipt(receipt) : this.renderForm(rawTx)}
          {error ? <ErrorBox error={error} /> : null}
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

  renderForm (rawTx) {
    const { from, to, value, gas, data } = getTx(this.props)

    const { gasLimit, gasPrice } = this._gas()

    const form = (
      <View>
        <Text>{from}</Text>
        <Text>{to}</Text>
        <Text>{value}</Text>
        <Text>{gasLimit || gas}</Text>
        <Text>{gasPrice}</Text>
        <Text>{data}</Text>
      </View>
    )

    return rawTx ? (
      <View>
        {form}
        <Text>{rawTx}</Text>
        <Button title={t('button.confirmAndSendTransaction')} onPress={this.confirmAndSend} />
        <Button title={t('button.cancelTransaction')} onPress={this.dismissModal} />
      </View>
    ) : (
      <View>
        {form}
        <Button title={t('button.generateRawTransaction')} onPress={this.generateRaw} />
        <Button title={t('button.cancelTransaction')} onPress={this.dismissModal} />
      </View>
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
        from, to, value, data, gasLimit, gasPrice
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
