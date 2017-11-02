import React from 'react'
import PropTypes from 'prop-types'
import { Text, View } from 'react-native'

import Button from '../Button'
import Icon from '../Icon'
import styles from './styles'

const PickerButton = ({ label, style, onPress, onLayout }) => {
  const content = (
    <View style={styles.content}>
      <Text style={styles.text}>{label}</Text>
      <Icon style={styles.iconText} name="sort-desc" />
    </View>
  )

  return (
    <Button
      onPress={onPress}
      style={style}
      type="picker"
      onLayout={onLayout}>
      {content}
    </Button>
  )
}

PickerButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  label: PropTypes.string,
  style: PropTypes.oneOfType([ PropTypes.number, PropTypes.array, PropTypes.object ]),
  onLayout: PropTypes.func
}

export default PickerButton
