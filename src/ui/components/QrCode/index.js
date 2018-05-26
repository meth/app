import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'

import QRCode from './component'
import styles from './styles'

export default class QrCode extends PureComponent {
  static propTypes = {
    input: PropTypes.string.isRequired,
    style: PropTypes.any,
    size: PropTypes.number.isRequired
  }

  render () {
    const { input, style, size } = this.props

    return (
      <View style={[ styles.container, style ]}>
        <QRCode
          bgColor="#FFFFFF"
          fgColor="#000000"
          level="L"
          size={size}
          input={input}
        />
      </View>
    )
  }
}
