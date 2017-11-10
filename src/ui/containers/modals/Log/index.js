import React, { PureComponent } from 'react'
import { Text } from 'react-native'

import { connectStore } from '../../../helpers/redux'
import ScrollView from '../../../components/ScrollView'
import Modal from '../../../components/Modal'
import { INFO, WARN, ERROR, ALERT } from '../../../../constants/logLevels'
// import { getUnseenAlerts, getLogWithoutUnseenAlerts } from '../../../../redux/log/selectors'
import styles from './styles'

@connectStore('modals', 'log')
export default class Log extends PureComponent {
  render () {
    // const unseenAlerts = getUnseenAlerts(this.props)
    // const log = getLogWithoutUnseenAlerts(this.props)

    const unseenAlerts = [
      {
        level: ALERT,
        ts: Date.now(),
        msg: `We very much regret that yesterday’s incident has caused a great deal of stress and confusion amongst our users and the community as a whole, especially with all the speculation surrounding the issue. We continue to investigate the situation and are exploring all possible implications and solutions. Blockchain and related technologies are a vanguard area of computer science. Our mission remains to build software to power the decentralised web.

If you are concerned about whether your wallet has been affected please visit http://www.parity.com that we created to provide a list of affected accounts. We are in touch with users affected by the issue – in case you are affected and want to reach out, please contact us under`
      }
    ]

    const log = [
      {
        level: INFO,
        ts: Date.now(),
        msg: `Staring ...`
      },
      {
        level: WARN,
        ts: Date.now(),
        msg: `Staring ...`
      },
      {
        level: ALERT,
        ts: Date.now(),
        msg: `We very much regret that yesterday’s incident has caused a great deal of stress and confusion amongst our users and the community as a whole, especially with all the speculation surrounding the issue. We continue to investigate the situation and are exploring all possible implications and solutions. Blockchain and related technologies are a vanguard area of computer science. Our mission remains to build software to power the decentralised web.

If you are concerned about whether your wallet has been affected please visit http://www.parity.com that we created to provide a list of affected accounts. We are in touch with users affected by the issue – in case you are affected and want to reach out, please contact us under`
      },
      {
        level: ERROR,
        ts: Date.now(),
        msg: `Staring ...`
      }
    ]

    return (
      <Modal overlayStyle={styles.overlay}>
        <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContent}>
          <Text style={styles.text}>{JSON.stringify(unseenAlerts)}</Text>
          <Text style={styles.text}>{JSON.stringify(log)}</Text>
        </ScrollView>
      </Modal>
    )
  }

  onClose = () => {
    const { actions: { hideLog } } = this.props

    hideLog()
  }
}
