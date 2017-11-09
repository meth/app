import React, { PureComponent } from 'react'
import { View, Text } from 'react-native'

import { connectStore } from '../../../helpers/redux'
import Modal from '../../../components/Modal'
import { getUnseenAlerts, getLogWithoutUnseenAlerts } from '../../../../redux/log/selectors'
import styles from './styles'

@connectStore('modals', 'log')
export default class Log extends PureComponent {
  render () {
    const unseenAlerts = getUnseenAlerts(this.props)
    const log = getLogWithoutUnseenAlerts(this.props)

    return (
      <Modal onOverlayPress={this.onClose} overlayStyle={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.text}>{unseenAlerts}</Text>
          <Text style={styles.text}>{log}</Text>
        </View>
      </Modal>
    )
  }

  onClose = () => {
    const { actions: { hideLog } } = this.props

    hideLog()
  }
}
