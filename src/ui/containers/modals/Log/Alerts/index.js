import React, { PureComponent } from 'react'
import { View, Text } from 'react-native'

import { t } from '../../../../../../common/strings'
import { formatDate } from '../../../../../utils/datetime'
import { connectStore } from '../../../../helpers/redux'
import ScrollView from '../../../../components/ScrollView'
import AlertBox from '../../../../components/AlertBox'
import styles from './styles'


@connectStore('log')
export default class Alerts extends PureComponent {
  render () {
    return (
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {this.renderAlerts()}
      </ScrollView>
    )
  }

  renderAlerts () {
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
}
