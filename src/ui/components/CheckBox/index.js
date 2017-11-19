import React, { Component } from 'react'
import { View, Text } from 'react-native'

import createStyles from './styles'
import TouchableView from '../TouchableView'
import Icon from '../Icon'

export default class CheckBox extends Component {
  render () {
    const {
      label,
      turnedOn,
      style,
      boxStyle,
      tickIconStyle,
      labelTextStyle
    } = this.props

    const styles = createStyles({ turnedOn })

    return (
      <TouchableView
        style={[ styles.container, style ]}
        onPress={this.onPress}
      >
        <View style={[ styles.box, boxStyle ]}>
          <Icon name='check' style={[ styles.tickIcon, tickIconStyle ]} size={17} />
        </View>
        {(!label) ? null : (
          <Text style={[ styles.labelText, labelTextStyle ]}>{label}</Text>
        )}
      </TouchableView>
    )
  }

  onPress = () => {
    const { onChange } = this.props

    onChange(!this.props.turnedOn)
  }

  getValue () {
    return this.props.turnedOn
  }
}
