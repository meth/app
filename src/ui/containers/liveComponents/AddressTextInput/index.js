import _ from 'lodash'
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'

import { connectStore } from '../../../helpers/redux'
import styles from './styles'
import { isAddress } from '../../../../utils/string'
import AddressBookPicker from '../AddressBookPicker'
import AddAddressBookEntryIconButton from '../AddAddressBookEntryIconButton'
import TextInput from '../../../components/TextInput'
import Icon from '../../../components/Icon'


@connectStore('account')
export default class AddressTextInput extends PureComponent {
  static propTypes = Object.assign({}, TextInput.PropTypes, {
    style: PropTypes.any,
    pickerButtonStyle: PropTypes.any,
    pickerButtonIconStyle: PropTypes.any,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func
  })

  render () {
    const { style, pickerButtonStyle, value, placeholder, ...props } = this.props
    const { getAddressBook } = this.props.selectors

    let addButton = null
    if (isAddress(value)) {
      const addressBook = getAddressBook()

      if (!_.get(addressBook[value], 'label')) {
        addButton = (
          <AddAddressBookEntryIconButton
            style={styles.addToAddressBookButton}
            address={value}
          />
        )
      }
    }

    return (
      <View style={[ styles.container ].concat(style)}>
        <TextInput
          ref={this._onTextInputRef}
          value={value}
          placeholder={placeholder}
          style={styles.textInput}
          {...props}
        />
        <AddressBookPicker
          style={styles.picker}
          selected={value}
          onChange={this._onPick}
          button={{
            theme: 'default',
            style: [ styles.pickerButton ].concat(pickerButtonStyle),
            renderLabel: this._renderPickerButtonLabel,
            renderIcon: this._renderPickerButtonIcon
          }}
        />
        {addButton}
      </View>
    )
  }

  _onPick = value => {
    const { onChange } = this.props

    if (onChange) {
      onChange(value)
    }
  }

  _renderPickerButtonLabel = () => null

  _renderPickerButtonIcon = () => {
    const { pickerButtonIconStyle } = this.props

    return (
      <Icon style={[ styles.pickerButtonIcon ].concat(pickerButtonIconStyle)} name='search' />
    )
  }

  _onTextInputRef = input => {
    this.textInput = input
  }

  focus () {
    if (this.textInput) {
      this.textInput.focus()
    }
  }

  unfocus () {
    if (this.textInput) {
      this.textInput.blur()
    }
  }

  getValue () {
    return this.props.value
  }
}
