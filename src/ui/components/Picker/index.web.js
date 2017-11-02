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
    popupStyle: {}
  }

  render () {
    const { open, popupStyle } = this.state

    const { options, selected, style, buttonStyle } = this.props

    const { label } = options.find(({ value }) => value === selected)

    return (
      <View style={[ styles.container, style ]}>
        <div ref={this.onButtonElementRef}>
          <PickerButton
            onPress={this.onPressButton}
            label={label}
            open={open}
            style={buttonStyle}
          />
        </div>
        {(!open) ? null : (
          <Popup style={popupStyle}>
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
        hoverStyle={styles.optionContainerHover}
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

  onButtonElementRef = btnDiv => {
    if (!btnDiv) {
      return
    }

    const { left, top, width, height } = btnDiv.getBoundingClientRect()

    this.setState({
      popupStyle: { left, top: top + height, width }
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
  style: PropTypes.oneOfType([ PropTypes.number, PropTypes.object ]),
  buttonStyle: PropTypes.oneOfType([ PropTypes.number, PropTypes.object ])
}
