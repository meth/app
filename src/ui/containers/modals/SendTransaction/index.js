import React, { PureComponent } from 'react'
import { Text, View } from 'react-native'

import { connectStore } from '../../../helpers/redux'
import Modal from '../../../components/Modal'
import styles from './styles'

@connectStore('wallet')
export default class SendTransaction extends PureComponent {
  render () {
    return (
      <Modal>
        <View style={styles.container}>
          <Text>test</Text>
        </View>
      </Modal>
    )
  }
}
