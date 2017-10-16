import React, { PureComponent } from 'react'
import { Text, View } from 'react-native'

import { connectStore, mutable } from '../../../helpers/redux'
import { t } from '../../../../../common/strings'
import Modal from '../../../components/Modal'
import Button from '../../../components/Button'
import ErrorBox from '../../../components/ErrorBox'
import styles from './styles'

@connectStore('wallet', 'api')
export default class SendTransaction extends PureComponent {
  state = {
    error: null,
    gasPrice: 1
  }

  render () {
    const {
      wallet: {
        currentTransaction: {
          from, to, value, gas, data
        }
      }
    } = mutable(this.props)

    const { error, gasPrice } = this.state

    return (
      <Modal>
        <View style={styles.container}>
          <Text>{from}</Text>
          <Text>{to}</Text>
          <Text>{value}</Text>
          <Text>{gas}</Text>
          <Text>{gasPrice}</Text>
          <Text>{data}</Text>
          <Button title={t('button.confirmAndSend')} onPress={this.sendTransaction} />
          <Button title={t('button.cancelTransaction')} onPress={this.dismissModal} />
          {(!error) ? null : (
            <ErrorBox error={error} />
          )}
        </View>
      </Modal>
    )
  }

  sendTransaction = () => {
    const {
      wallet: {
        currentTransaction: {
          from, to, value, gas, data
        }
      }
    } = mutable(this.props)

    const { gasPrice } = this.state

    this.setState({
      error: null
    }, () => {
      this.props.actions.finalizeTransaction({
        from, to, value, gas, data, gasPrice
      })
        .catch(error => {
          this.setState({ error })
        })
    })
  }

  dismissModal = () => {
    this.props.actions.cancelTransaction(t('error.userCancelledTransaction'))
  }
}
