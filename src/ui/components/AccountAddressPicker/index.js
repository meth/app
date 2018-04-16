import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import Picker from '../Picker'
import LabelledAddress from '../LabelledAddress'
import styles from './styles'


export default class AccountAddressPicker extends PureComponent {
  static propTypes = Object.assign({}, Picker.propTypes, {
    options: PropTypes.arrayOf(PropTypes.shape({
      address: PropTypes.string.isRequired,
      label: PropTypes.string
    })).isRequired
  })

  render () {
    const { options } = this.props

    const finalOptions = options.map(({ address, label }) => ({
      value: address,
      label: address,
      category: label
    }))

    return (
      <Picker
        {...this.props}
        ref={this._onPickerRef}
        options={finalOptions}
        renderOption={this._renderPickerOption}
        renderButtonLabel={this._renderPickerButtonLabel}
      />
    )
  }

  _onPickerRef = elem => {
    this.picker = elem
  }

  _renderPickerOption = ({ value, category }) => (
    <LabelledAddress
      address={value}
      label={category}
      addressTextStyle={styles.addressText}
      labelTextStyle={styles.labelText}
    />
  )

  _renderPickerButtonLabel = () => {
    const { selected, options } = this.props

    const { label } = options.find(({ address }) => address === selected)

    return (
      <LabelledAddress
        address={selected}
        label={label}
        addressTextStyle={styles.addressText}
        labelTextStyle={styles.labelText}
      />
    )
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
