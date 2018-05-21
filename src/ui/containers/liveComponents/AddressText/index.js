import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'

import { connectStore } from '../../../helpers/redux'
import ADDRESS_TYPES from '../../../../../common/constants/addressTypes'
import CopyableText from '../../../components/CopyableText'
import AddAddressBookEntryIconButton from '../AddAddressBookEntryIconButton'
import styles from './styles'

@connectStore('account')
export default class AddressText extends PureComponent {
  static propTypes = {
    text: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    addressType: PropTypes.oneOf([ ADDRESS_TYPES.ACCOUNT, ADDRESS_TYPES.CONTRACT ]),
    style: PropTypes.any,
    textStyle: PropTypes.any
  }

  render () {
    const { text, address, addressType, style, textStyle } = this.props

    return (
      <View style={[ styles.container ].concat(style)}>
        <CopyableText
          text={text}
          style={styles.copyableTextContainer}
          textStyle={textStyle}
          buttonStyle={styles.button}
        />
        <AddAddressBookEntryIconButton
          style={styles.button}
          address={address}
          addressType={addressType}
        />
      </View>
    )
  }
}
