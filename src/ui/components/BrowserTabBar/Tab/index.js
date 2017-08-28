import _ from 'lodash'
import React from 'react'
import { View, Text } from 'react-native'
import { SortableElement } from 'react-sortable-hoc'

import { STATE } from '../../../../../common/constants'
import { trimProtocol } from '../../../../utils/url'
import styles from './styles'
import TouchableView from '../../TouchableView'
import IconButton from '../../IconButton'
import Icon from '../../Icon'
import Loading from '../../Loading'


const MAX_LABEL_LENGTH = 20



const sanitizeLabel = (label) => {
  // trim
  label = trimProtocol(_.trim(label, '/'))

  // limit length
  return (MAX_LABEL_LENGTH > label.length)
    ? label
    : `${label.substr(0, MAX_LABEL_LENGTH - 3)}...`
}


export default SortableElement(tab => {
  const { label: defaultLabel, url, active, onSelect, onClose, status } = tab

  // status icon
  let statusIcon = null
  let label = defaultLabel
  switch (status) {
    case STATE.LOADING:
      statusIcon = <Loading />
      label = url
      break
    case STATE.ERROR:
      statusIcon = <Icon name='exclamation-circle' />
      label = url
      break
  }
  if (statusIcon) {
    statusIcon = (
      <View style={styles.status}>
        {statusIcon}
      </View>
    )
  }

  return (
    <TouchableView
      style={[styles.tab, active ? styles.activeTab : null]}
      onPress={active ? null : onSelect}
      title={label}
    >
      <View style={styles.content}>
        <View style={styles.leftContent}>
          {statusIcon}
          <Text style={[styles.tabText, active ? styles.activeTabText : null]}>
            {sanitizeLabel(label)}
          </Text>
        </View>
        <View style={styles.rightContent}>
          {(!onClose) ? null : (
            <IconButton
              name='close'
              onPress={onClose}
            />
          )}
        </View>
      </View>
    </TouchableView>
  )
})
