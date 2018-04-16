import React from 'react'
import PropTypes from 'prop-types'
import { Text, View } from 'react-native'

import Button from '../Button'
import Icon from '../Icon'
import styles from './styles'

const PickerButton = ({
  label,
  style,
  onPress,
  onLayout,
  renderLabel
}) => {
  const content = (
    <View style={styles.content}>
      {renderLabel ? renderLabel(label) : (
        <Text style={styles.text}>{label}</Text>
      )}
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
  style: PropTypes.any,
  renderLabel: PropTypes.func
}

export default PickerButton
