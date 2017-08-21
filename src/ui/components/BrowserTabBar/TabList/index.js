import _ from 'lodash'
import React from 'react'
import { View } from 'react-native'
import { SortableContainer } from 'react-sortable-hoc'

import styles from './styles'
import Tab from '../Tab'


export default SortableContainer(({ tabs, onSelect, onClose }) => {
  const items = _.map(tabs, (tab, index) => (
    <Tab
      key={tab.id}
      index={index}
      onSelect={() => onSelect(tab.id)}
      onClose={1 < tabs.length ? () => onClose(tab.id) : null}
      {...tab}
    />
  ))

  return (
    <View style={styles.tabs}>{items}</View>
  )
})
