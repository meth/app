import _ from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'
import { View, Text } from 'react-native'
import { SortableElement } from 'react-sortable-hoc'

import STATE from '../../../../constants/states'
import { trimProtocol } from '../../../../utils/url'
import styles from './styles'
import TouchableView from '../../TouchableView'
import IconButton from '../../IconButton'
import Icon from '../../Icon'
import Loading from '../../Loading'

const MAX_LABEL_LENGTH = 20

const sanitizeLabel = label => {
  // trim
  const myLabel = trimProtocol(_.trim(label, '/'))

  // limit length
  return MAX_LABEL_LENGTH > myLabel.length
    ? myLabel
    : `${myLabel.substr(0, MAX_LABEL_LENGTH - 3)}...`
}

const Tab = SortableElement(tab => {
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
      statusIcon = <Icon name="exclamation-circle" />
      label = url
      break
    default:
      break
  }
  if (statusIcon) {
    statusIcon = <View style={styles.status}>{statusIcon}</View>
  }

  return (
    <TouchableView
        style={[ styles.tab, active ? styles.activeTab : null ]}
        onPress={active ? null : onSelect}
        title={label}>
      <View style={[ styles.bg, active ? styles.activeBg : null ]} />
      <View style={styles.content}>
        <View style={styles.leftContent}>
          {statusIcon}
          <Text
            style={[ styles.tabText, active ? styles.activeTabText : null ]}>
            {sanitizeLabel(label)}
          </Text>
        </View>
        <View style={styles.rightContent}>
          {(!onClose) ? null : (
            <IconButton icon={{ name: 'close' }} onPress={onClose} />
          )}
        </View>
      </View>
    </TouchableView>
  )
})

Tab.propTypes = {
  label: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  onSelect: PropTypes.func,
  active: PropTypes.bool,
  onClose: PropTypes.func,
  status: PropTypes.string
}

export default Tab
