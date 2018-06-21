import React from 'react'
import PropTypes from 'prop-types'
import { Text, View } from 'react-native'

import Button from '../Button'
import Icon from '../Icon'
import styles from './styles'

const PickerButton = ({
  label,
  style,
  textStyle,
  tooltip,
  onPress,
  onLayout,
  renderLabel,
  renderIcon,
  theme
}) => (
  <Button
    onPress={onPress}
    style={[ styles.content ].concat(style)}
    type={theme}
    onLayout={onLayout}
    tooltip={tooltip}
  >
    <View style={styles.labelContainer}>
      {renderLabel ? renderLabel(label) : (
        <Text style={[ styles.text ].concat(textStyle)} numberOfLines={1} ellipsizeMode='tail'>
          {label}
        </Text>
      )}
    </View>
    {renderIcon ? renderIcon() : (
      <Icon style={styles.iconText} name="sort-desc" />
    )}
  </Button>
)

PickerButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  label: PropTypes.string,
  theme: PropTypes.string,
  style: PropTypes.any,
  textStyle: PropTypes.any,
  renderLabel: PropTypes.func,
  renderIcon: PropTypes.func,
  onLayout: PropTypes.func
}

PickerButton.defaultProps = {
  theme: 'picker'
}

export default PickerButton
