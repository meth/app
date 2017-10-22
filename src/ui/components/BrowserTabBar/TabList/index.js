import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import { SortableContainer } from 'react-sortable-hoc'

import styles from './styles'
import Tab from '../Tab'

const TabList = SortableContainer(({ tabs, onSelect, onClose }) => (
  <View style={styles.tabs}>{
    tabs.map((tab, index) => (
      <Tab
        key={tab.id}
        index={index}
        onSelect={() => onSelect(tab.id)}
        onClose={1 < tabs.length ? () => onClose(tab.id) : null}
        {...tab}
      />
    ))
  }</View>
))

TabList.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]).isRequired,
    ...Tab.propTypes
  })),
  onSelect: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired
}

export default TabList
