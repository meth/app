import React from 'react'
import PropTypes from 'prop-types'

import PickerButton from '../PickerButton'

const Picker = ({ options, selected, buttonStyle }) => {
  const { label } = options.find(({ value }) => value === selected)

  return (
    <PickerButton
      label={label}
      style={buttonStyle} />
  )
}

Picker.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    category: PropTypes.string
  })).isRequired,
  selected: PropTypes.string,
  buttonStyle: PropTypes.number
}

export default Picker
