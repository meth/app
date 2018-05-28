import React from 'react'
import { Text } from 'react-native'
import PropTypes from 'prop-types'

import { t } from '../../../../../../common/strings'
import IconButton from '../../../../components/IconButton'
import styles from './styles'

const AlertsButton = ({ style, onPress, unseenAlertsCount }) => (
  <IconButton
    style={style}
    type='text'
    onPress={onPress}
    tooltip={t('tooltip.logAlerts')}
    icon={{ name: 'bell-o' }}>
      {unseenAlertsCount ? (
        <Text style={styles.numbersText}>{unseenAlertsCount}</Text>
      ) : null}
  </IconButton>
)

AlertsButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  unseenAlertsCount: PropTypes.number,
  style: PropTypes.oneOfType([ PropTypes.number, PropTypes.object ])
}

export default AlertsButton
