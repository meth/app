import _ from 'lodash'
import React, { PureComponent } from 'react'

import { t } from '../../../../../common/strings'
import { connectStore } from '../../../helpers/redux'
import ModalFilterPicker from '../../../components/ModalFilterPicker'
import LabelledAddress from '../../../components/LabelledAddress'
import styles from './styles'

@connectStore('account')
export default class AddressBookPicker extends PureComponent {
  static propTypes = _.omit(ModalFilterPicker.propTypes, 'options')

  render () {
    const buttonProps = Object.assign({
      tooltip: t('button.pickAddress')
    }, this.props.button)

    return (
      <ModalFilterPicker
        ref={this._onPickerRef}
        title={t('modal.addressBookPicker.title')}
        {...this.props}
        button={buttonProps}
        options={this._getOptions()}
        renderOptionText={this._renderPickerOptionText}
      />
    )
  }

  _getOptions () {
    const { getAddressBook } = this.props.selectors

    const addresses = getAddressBook()

    return Object.keys(addresses).map(address => ({
      ...addresses[address],
      value: address
    }))
  }

  _renderPickerOptionText = ({ value, label }) => (
    <LabelledAddress
      addressTextStyle={styles.addressText}
      address={value}
      label={label}
    />
  )

  getValue () {
    if (this.picker) {
      return this.picker.getValue()
    }

    return null
  }

  focus () {
    if (this.picker) {
      this.picker.focus()
    }
  }

  unfocus () {
    if (this.picker) {
      this.picker.unfocus()
    }
  }

  _onPickerRef = e => {
    this.picker = e
  }
}
