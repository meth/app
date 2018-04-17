import React from 'react'
import PropTypes from 'prop-types'
import { Text } from 'react-native'

import Button from '../Button'
import Icon from '../Icon'
import styles from './styles'

const PickerButton = ({
  label,
  style,
  textStyle,
  onPress,
  onLayout,
  renderLabel
}) => (
  <Button
    onPress={onPress}
    style={[ styles.content ].concat(style)}
    type="picker"
    onLayout={onLayout}
  >
    {renderLabel ? renderLabel(label) : (
      <Text style={[ styles.text ].concat(textStyle)}>{label}</Text>
    )}
    <Icon style={styles.iconText} name="sort-desc" />
  </Button>
)

PickerButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  label: PropTypes.string,
  style: PropTypes.any,
  textStyle: PropTypes.any,
  renderLabel: PropTypes.func,
  onLayout: PropTypes.func
}

export default PickerButton
