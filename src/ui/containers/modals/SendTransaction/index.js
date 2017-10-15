import React, { PureComponent } from 'react'
import { Text, View } from 'react-native'

import { connectStore, mutable } from '../../../helpers/redux'
import { t } from '../../../../../common/strings'
import Modal from '../../../components/Modal'
import styles from './styles'

@connectStore('wallet', 'api')
export default class SendTransaction extends PureComponent {
  render () {
    const {
      currentTransaction: {
        from, to, value, gas, data
      }
    } = mutable(this.props)

    return (
      <Modal>
        <View style={styles.container}>
          <Text>{from}</Text>
          <Text>{to}</Text>
          <Text>{value}</Text>
          <Text>{gas}</Text>
          <Text>{data}</Text>
          <Button title={t('button.confirmAndSend')} onPress={this.sendTransaction} />
          <Button title={t('button.cancelTransaction')} onPress={this.dismissModal} />
        </View>
      </Modal>
    )
  }

  sendTransaction = () => {
    // TODO
  }

  dismissModal = () => {
    this.props.actions.cancelTransaction(t('error.userCancelledTransaction'))
  }
}
