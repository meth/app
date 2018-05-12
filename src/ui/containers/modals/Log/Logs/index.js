import React, { PureComponent } from 'react'
import { View, Text } from 'react-native'

import { formatDate } from '../../../../../utils/datetime'
import { connectStore } from '../../../../helpers/redux'
import ScrollView from '../../../../components/ScrollView'
import { LEVELS } from '../../../../../../common/constants/log'
import styles from './styles'

const { INFO, WARN, ERROR } = LEVELS

const LEVEL_TO_STYLE_MAP = {
  [INFO]: styles.info,
  [WARN]: styles.warn,
  [ERROR]: styles.error
}


@connectStore('log')
export default class Logs extends PureComponent {
  render () {
    return (
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {this.renderEvents()}
      </ScrollView>
    )
  }

  renderEvents () {
    const { getLogWithoutAlerts } = this.props.selectors

    const events = [ ...getLogWithoutAlerts() ]
    events.reverse()

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
}
