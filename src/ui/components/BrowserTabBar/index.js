import _ from 'lodash'
import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc'

import { STATUS } from '../../../../common/constants'
import styles from './styles'
import TouchableView from '../TouchableView'
import Icon from '../Icon'
import Loading from '../Loading'
import { trimProtocol } from '../../../utils/url'

const MAX_LABEL_LENGTH = 20



const sanitizeLabel = (label) => {
  // trim
  label = trimProtocol(_.trim(label, '/'))

  // limit length
  return (MAX_LABEL_LENGTH > label.length)
    ? label
    : `${label.substr(0, MAX_LABEL_LENGTH - 3)}...`
}



const Tab = SortableElement(tab => {
  const { label: defaultLabel, url, active, onSelect, status } = tab

  // status icon
  let statusIcon = null
  let label = defaultLabel
  switch (status) {
    case STATUS.LOADING:
      statusIcon = <Loading />
      label = url
      break
    case STATUS.ERROR:
      statusIcon = <Icon name='exclamation-circle' />
      label = url
      break
  }
  if (statusIcon) {
    statusIcon = (
      <View style={styles.tabStatus}>
        {statusIcon}
      </View>
    )
  }

  return (
    <TouchableView
      style={[styles.tab, active ? styles.activeTab : null]}
      onPress={active ? null : onSelect}
    >
      <View style={styles.tabContent}>
        {statusIcon}
        <Text style={[styles.tabText, active ? styles.activeTabText : null]}>
          {sanitizeLabel(label)}
        </Text>
      </View>
    </TouchableView>
  )
})



const TabList = SortableContainer(({ tabs, onSelect }) => {
  const items = _.map(tabs, (tab, index) => (
    <Tab key={index} index={index} onSelect={() => onSelect(index)} {...tab} />
  ))
  return (
    <View style={styles.tabs}>{items}</View>
  )
})


export default class BrowserTabBar extends Component {
  render () {
    const { tabs } = this.props

    return (
      <View style={styles.container}>
        <TabList
          tabs={tabs}
          onSortEnd={this.onSortEnd}
          onSelect={this.onSelectTab}
          axis='x'
          lockAxis='x'
        />
      </View>
    )
  }

  onSortEnd = ({ oldIndex, newIndex }) => {
    const { onSort, tabs } = this.props

    onSort(arrayMove(tabs, oldIndex, newIndex))
  }

  onSelectTab = (id) => {
    const { onSelect } = this.props

    onSelect(id)
  }
}
