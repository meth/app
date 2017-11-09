import React from 'react'
import PropTypes from 'prop-types'

import IconButton from '../../IconButton'

const AlertsButton = ({ style, onPress }) => (
  <IconButton
    style={style}
    type='header'
    onPress={onPress}
    icon={{ name: 'bell-o' }} />
)

AlertsButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  unseenAlertsCount: PropTypes.number,
  style: PropTypes.oneOfType([ PropTypes.number, PropTypes.object ])
}

export default AlertsButton
