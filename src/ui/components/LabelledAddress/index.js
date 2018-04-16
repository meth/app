import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { View, Text } from 'react-native'

import IconButton from '../IconButton'
import styles from './styles'

export default class LabelledAddress extends PureComponent {
  static propTypes = {
    address: PropTypes.string.isRequired,
    displayShortened: PropTypes.bool,
    editButtonProps: PropTypes.shape(IconButton.propTypes),
    label: PropTypes.string,
    addressTextStyle: PropTypes.any,
    labelTextStyle: PropTypes.any,
    style: PropTypes.any
  }

  static defaultProps = {
    editButtonProps: null,
    displayShortened: false
  }

  render () {
    const {
      address,
      displayShortened,
      label,
      style,
      addressTextStyle,
      labelTextStyle,
      editButtonProps
    } = this.props

    const finalAddress = displayShortened ? (
      `${address.substr(0, 6)}....${address.substr(-6)}`
    ) : address

    return (
      <View style={[ styles.container, style ]}>
        <Text style={[ styles.addressText ].concat(addressTextStyle)}>{finalAddress}</Text>
        <View style={styles.label}>
          <Text style={[ styles.labelText ].concat(labelTextStyle)}>{label || ''}</Text>
          {editButtonProps ? (
            <IconButton
              {...editButtonProps}
              icon={{
                name: 'pencil',
                ...editButtonProps.icon
              }}
            />
          ) : null}
        </View>
      </View>
    )
  }
}
