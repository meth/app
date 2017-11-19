import React, { Component } from 'react'
import { View, Text, Switch } from 'react-native'

import createStyles from './styles'
import TouchableView from '../TouchableView'

export default class CustomSwitch extends Component {
  render () {
    const {
      label,
      turnedOn,
      style,
      switchStyle,
      labelTextStyle
    } = this.props

    const styles = createStyles({ turnedOn })

    return (
      <View style={[ styles.container, style ]}>
        <Switch
          style={[ styles.switch, switchStyle ]}
          value={turnedOn}
          onValueChange={this.onPress}
        />
        {(!label) ? null : (
          <TouchableView onPress={this.onPress} style={styles.textContainer}>
            <Text style={[ styles.labelText, labelTextStyle ]}>{label}</Text>
          </TouchableView>
        )}
      </View>
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
