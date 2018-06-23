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
    const { getAlerts, getUnseenAlertsCount } = this.props.selectors

    const numUnseenAlerts = getUnseenAlertsCount()
    const alerts = [ ...getAlerts() ]
    alerts.reverse()

    return (
      <Modal
        contentStyle={styles.content}
        contentScrollContainerStyle={styles.contentScrollContainer}
        onPressCloseButton={this.close}
        closeButtonStyle={styles.closeButton}
      >
        {numUnseenAlerts ? (
          <AlertBox
            type='info'
            text={t(`log.numUnseenAlerts`, { num: numUnseenAlerts })}
          />
        ) : null}
        {this._renderContent(alerts, numUnseenAlerts)}
      </Modal>
    )
  }

  _renderContent (alerts, numUnseenAlerts) {
    if (!alerts.length) {
      return (
        <AlertBox
          type='info'
          text={t(`log.noAlertsYet`)}
        />
      )
    }

    return alerts.map(({ msg, ts }, index) => (
      <View style={styles.alert} key={index}>
        <Text style={index < numUnseenAlerts ? styles.newAlertText : styles.alertText}>
          {msg}
        </Text>
        <Text style={index < numUnseenAlerts ? styles.newAlertMetaText : styles.alertMetaText}>
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
