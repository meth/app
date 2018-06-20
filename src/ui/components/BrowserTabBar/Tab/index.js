import React from 'react'
import PropTypes from 'prop-types'
import { View, Text } from 'react-native'
import { SortableElement } from 'react-sortable-hoc'

import { t } from '../../../../../common/strings'
import STATE from '../../../../../common/constants/states'
import { getSpinnerColor, createStyles } from './styles'
import TouchableView from '../../TouchableView'
import IconButton from '../../IconButton'
import Loading from '../../Loading'


const Tab = SortableElement(tab => {
  const { label: defaultLabel, totalTabs, url, active, onSelect, onClose, status } = tab

  const styles = createStyles({ totalTabs })

  // status icon
  let statusIcon = null
  let label = defaultLabel
  switch (status) {
    case STATE.LOADING:
      statusIcon = <Loading color={getSpinnerColor()} />
      label = url
      break
    // case STATE.ERROR:
    //   statusIcon = <Icon name="exclamation-circle" />
    //   label = url
    //   break
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
            numberOfLines={1}
            selectable={false}
            style={[ styles.tabText, active ? styles.activeTabText : null ]}>
              {label}
          </Text>
        </View>
        <View style={styles.rightContent}>
          {(!onClose) ? null : (
            <IconButton
              style={styles.closeButton}
              tooltip={t('button.browser.closeTab')}
              type='browserTab'
              icon={{ name: 'close' }}
              onPress={onClose} />
          )}
        </View>
      </View>
    </TouchableView>
  )
})

Tab.propTypes = {
  label: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  totalTabs: PropTypes.number,
  onSelect: PropTypes.func,
  active: PropTypes.bool,
  onClose: PropTypes.func,
  status: PropTypes.string
}

export default Tab
