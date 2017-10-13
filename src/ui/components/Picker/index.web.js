import _ from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'

const Select = ({ selected, options, onChange }) => {
  const cat = {}
  _.each(options, ({ value, label, category }) => {
    cat[category] = cat[category] || []
    cat[category].push(
      <option key={value} value={value}>
        {label}
      </option>
    )
  })

  const renderedOptions = _.map(cat, (items, category) => (
    <optgroup key={category} label={category}>
      {items}
    </optgroup>
  ))

  return (
    <View>
      <select onChange={onChange} value={selected}>
        {renderedOptions}
      </select>
    </View>
  )
}

Select.propTypes = {
  selected: PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]),
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string,
    label: PropTypes.string,
    category: PropTypes.string
  }))
}

export default Select
