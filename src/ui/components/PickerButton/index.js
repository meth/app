import React from 'react'
import PropTypes from 'prop-types'
import { Text, View } from 'react-native'

import Button from '../Button'
import Icon from '../Icon'
import styles from './styles'

const PickerButton = ({ label, style }) => {
  const content = (
    <View style={styles.content}>
      <Text style={styles.text}>{label}</Text>
      <Icon style={styles.iconText} name="sort-desc" />
    </View>
  )

  return (
    <Button
      style={style}
      type="picker">
      {content}
    </Button>
  )
}

PickerButton.propTypes = {
  label: PropTypes.string,
  style: PropTypes.number
}

export default PickerButton
