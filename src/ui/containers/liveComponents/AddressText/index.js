import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { View, Text } from 'react-native'

import { connectStore } from '../../../helpers/redux'
import AddAddressBookEntryIconButton from '../AddAddressBookEntryIconButton'
import styles from './styles'


@connectStore('account')
export default class AddressText extends PureComponent {
  static propTypes = {
    text: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    addressType: AddAddressBookEntryIconButton.propTypes.addressType,
    style: PropTypes.any,
    textStyle: PropTypes.any
  }

  render () {
    const { text, address, addressType, style, textStyle } = this.props

    return (
      <View style={[ styles.container ].concat(style)}>
        <Text style={[ styles.text ].concat(textStyle)}>{text}</Text>
        <AddAddressBookEntryIconButton
          style={styles.addToAddressBookButton}
          address={address}
          addressType={addressType}
        />
      </View>
    )
  }
}
