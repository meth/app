import _ from 'lodash'
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { connectStore } from '../../../helpers/redux'
import ADDRESS_TYPES from '../../../../../common/constants/addressTypes'
import { t } from '../../../../../common/strings'
import IconButton from '../../../components/IconButton'
import styles from './styles'


@connectStore('account')
export default class AddAddressBookEntryIconButton extends PureComponent {
  static propTypes = {
    address: PropTypes.string.isRequired,
    addressType: PropTypes.oneOf([ ADDRESS_TYPES.ACCOUNT, ADDRESS_TYPES.CONTRACT ]),
    style: PropTypes.any,
    textStyle: PropTypes.any
  }

  render () {
    const { address, style, textStyle } = this.props
    const { getAddressBook } = this.props.selectors
    const addressBook = getAddressBook()

    return _.get(addressBook[address], 'label') ? null : (
      <IconButton
        style={[ styles.button ].concat(style)}
        icon={{ name: 'account-multiple-plus', style: [ styles.text ].concat(textStyle) }}
        onPress={this._onPress}
        tooltip={t('button.addToAddressBook')}
      />
    )
  }

  _onPress = () => {
    const { address, addressType } = this.props
    const { showEditAddressModal } = this.props.actions

    showEditAddressModal(address, addressType)
  }
}
