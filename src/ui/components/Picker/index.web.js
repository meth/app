import _ from 'lodash'
import React, { PureComponent } from 'react'
import { View } from 'react-native'


export default class Select extends PureComponent {
  render () {
    const {
      selected,
      options,
      onChange,
    } = this.props

    const cat = {}
    _.each(options, ({ value, label, category }) => {
      cat[category] = cat[category] || []
      cat[category].push(
        <option key={value} value={value}>{label}</option>
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
}
