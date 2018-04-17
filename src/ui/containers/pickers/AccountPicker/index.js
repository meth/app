import _ from 'lodash'
import React, { PureComponent } from 'react'

import { connectStore } from '../../../helpers/redux'
import Picker from '../../../components/Picker'
import LabelledAddress from '../../../components/LabelledAddress'
import styles from './styles'


@connectStore('account')
export default class AccountPicker extends PureComponent {
  static propTypes = _.omit(Picker.propTypes, 'options')

  render () {
    return (
      <Picker
        {...this.props}
        ref={this._onPickerRef}
        options={this._getOptions()}
        renderOption={this._renderPickerOption}
        button={{
          renderLabel: this._renderPickerButtonLabel
        }}
      />
    )
  }

  _onPickerRef = elem => {
    this.picker = elem
  }

  _renderPickerOption = ({ value, label }) => (
    <LabelledAddress
      address={value}
      label={label}
      addressTextStyle={styles.addressText}
      labelTextStyle={styles.labelText}
    />
  )

  _renderPickerButtonLabel = () => {
    const { selected } = this.props

    const label = _.get(
      this._getOptions().find(({ value }) => value === selected),
      'label',
      ''
    )

    return (
      <LabelledAddress
        address={selected || ''}
        label={label || ''}
        addressTextStyle={styles.addressText}
        labelTextStyle={styles.labelText}
      />
    )
  }

  _getOptions () {
    const { getAccounts } = this.props.selectors

    const accounts = getAccounts()

    return Object.keys(accounts).map(address => ({
      value: address,
      label: accounts[address].label,
      category: accounts[address].label
    }))
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

  getValue () {
    if (this.picker) {
      return this.picker.getValue()
    }

    return null
  }
}
