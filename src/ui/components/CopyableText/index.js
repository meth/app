import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { View, Text } from 'react-native'

import CopyToClipboardButton from '../CopyToClipboardButton'
import styles from './styles'

export default class CopyableText extends PureComponent {
  static propTypes = {
    text: PropTypes.string.isRequired,
    renderText: PropTypes.func,
    style: PropTypes.any,
    textStyle: PropTypes.any,
    buttonStyle: PropTypes.any
  }

  render () {
    const { text, renderText, style, textStyle, buttonStyle } = this.props

    return (
      <View style={[ styles.container, style ]}>
        {renderText ? renderText() : (
          <Text style={[ styles.text, textStyle ]}>{text}</Text>
        )}
        <CopyToClipboardButton text={text} style={buttonStyle} />
      </View>
    )
  }
}
