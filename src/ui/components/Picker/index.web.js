import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { View, Text } from 'react-native'

import TouchableView from '../TouchableView'
import { Popup } from '../Popup'
import PickerButton from '../PickerButton'
import styles from './styles'

export default class Picker extends PureComponent {
  state = {
    open: false,
    optionsContainerPosition: {}
  }

  render () {
    const { open, optionsContainerPosition } = this.state

    const { options, selected, style, buttonStyle } = this.props

    const { label } = options.find(({ value }) => value === selected)

    return (
      <View style={[ styles.container, style ]}>
        <PickerButton
          onPress={this.onPressButton}
          label={label}
          open={open}
          style={buttonStyle}
          onLayout={this.onButtonLayout}
        />
        {(!open) ? null : (
          <Popup style={optionsContainerPosition}>
            <View style={styles.optionsContainer}>
              {this.renderOptions({ options })}
            </View>
          </Popup>
        )}
      </View>
    )
  }

  renderOptions ({ options }) {
    return options.map(({ label, value }) => (
      <TouchableView
        key={value}
        style={styles.optionContainer}
        onPress={() => this.onSelect(value)}>
          <Text style={styles.optionText}>{label}</Text>
      </TouchableView>
    ))
  }

  onPressButton = () => {
    this.setState({
      open: !this.state.open
    })
  }

  onButtonLayout = ({ nativeEvent: { layout: { height, width } } }) => {
    this.setState({
      optionsContainerPosition: {
        top: height,
        left: 0,
        width
      }
    })
  }

  onSelect = value => {
    const { onChange } = this.props

    this.setState({
      open: false
    }, () => {
      onChange(value)
    })
  }
}

Picker.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    category: PropTypes.string
  })).isRequired,
  onChange: PropTypes.func.isRequired,
  selected: PropTypes.string,
  style: PropTypes.number,
  buttonStyle: PropTypes.number
}
