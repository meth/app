import React, { PureComponent } from 'react'
import { View, Text } from 'react-native'

import { connectStore } from '../../../helpers/redux'
import { formatDate } from '../../../../utils/datetime'
import { t } from '../../../../../common/strings'
import Modal from '../../../components/Modal'
import AlertBox from '../../../components/AlertBox'
import styles from './styles'

@connectStore('log')
export default class Log extends PureComponent {
  render () {
    return (
      <Modal
        contentStyle={styles.content}
        contentScrollContainerStyle={styles.contentScrollContainer}
        onPressCloseButton={this.close}
        closeButtonStyle={styles.closeButton}
      >
        {this._renderContent()}
      </Modal>
    )
  }

  _renderContent () {
    const { getAlerts } = this.props.selectors

    const events = [ ...getAlerts() ]
    events.reverse()

    if (!events.length) {
      return (
        <AlertBox
          type='info'
          text={t(`log.noAlertsYet`)}
        />
      )
    }

    return events.map(({ msg, ts }, index) => (
      <View style={styles.alert} key={index}>
        <Text style={styles.alertText}>
          {msg}
        </Text>
        <Text style={styles.alertMetaText}>
          {formatDate(ts)}
        </Text>
      </View>
    ))
  }

  close = () => {
    const { seenAlerts, hideLog } = this.props.actions

    seenAlerts()
    hideLog()
  }
}
