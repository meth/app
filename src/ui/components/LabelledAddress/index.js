import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { View, Text } from 'react-native'

import styles from './styles'

export default class LabelledAddress extends PureComponent {
  static propTypes = {
    address: PropTypes.string.isRequired,
    label: PropTypes.string,
    addressTextStyle: PropTypes.any,
    labelTextStyle: PropTypes.any,
    style: PropTypes.any
  }

  render () {
    const { address, label, style, addressTextStyle, labelTextStyle } = this.props

    return (
      <View style={[ styles.container, style ]}>
        <Text style={[ styles.addressText ].concat(addressTextStyle)}>{address}</Text>
        <Text style={[ styles.labelText ].concat(labelTextStyle)}>{label}</Text>
      </View>
    )
  }
}
