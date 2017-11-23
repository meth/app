import React, { PureComponent } from 'react'
import { View, Text } from 'react-native'

import { t } from '../../../../../common/strings'
import { formatDate } from '../../../../utils/datetime'
import { connectStore } from '../../../helpers/redux'
import ScrollView from '../../../components/ScrollView'
import Modal from '../../../components/Modal'
import { LEVELS } from '../../../../../common/constants/log'

import { getUnseenAlerts, getLogWithoutUnseenAlerts } from '../../../../redux/log/selectors'
import styles from './styles'

const { INFO, WARN, ERROR, ALERT } = LEVELS

const LEVEL_TO_STYLE_MAP = {
  [INFO]: styles.info,
  [WARN]: styles.warn,
  [ERROR]: styles.error,
  [ALERT]: styles.alert
}

@connectStore('modals', 'log')
export default class Log extends PureComponent {
  render () {
    const unseenAlerts = [ ...getUnseenAlerts(this.props) ]
    const log = [ ...getLogWithoutUnseenAlerts(this.props) ]

    // want the items in reverse chrono order
    unseenAlerts.reverse()
    log.reverse()

    return (
      <Modal overlayStyle={styles.overlay}
        onPressCloseButton={this.close}
        closeButtonStyle={styles.closeButton}>
          <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContent}>
            {this.renderAlerts(unseenAlerts)}
            <Text style={styles.appLogText}>{t('log.appEvents')}</Text>
            {this.renderLog(log)}
          </ScrollView>
      </Modal>
    )
  }

  renderAlerts (events) {
    return events.map(({ msg, ts }, index) => (
      <View style={styles.unseenAlert} key={index}>
        <Text style={styles.unseenAlertText}>
          {msg}
        </Text>
        <Text style={styles.unseenAlertMetaText}>
          {formatDate(ts)}
        </Text>
      </View>
    ))
  }

  renderLog (events) {
    return events.map(({ level, msg, ts, cat }, index) => (
      <View style={styles.event} key={index}>
        <View style={styles.eventMsg}>
          {INFO === level ? null : (
            <Text style={[ styles.eventLevelText, LEVEL_TO_STYLE_MAP[level] ]}>
              [{level}]
            </Text>
          )}
          <Text style={styles.eventMsgText}>
            {msg}
          </Text>
        </View>
        <View style={styles.eventMeta}>
          {(!cat) ? null : (
            <Text style={styles.eventMetaText}>
              {cat}
            </Text>
          )}
          <Text style={styles.eventMetaText}>
            {formatDate(ts)}
          </Text>
        </View>
      </View>
    ))
  }

  close = () => {
    const { actions: { hideLog } } = this.props

    hideLog()
  }
}
