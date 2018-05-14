import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'

import QRCode from './component'
import styles from './styles'

export default class QrCode extends PureComponent {
  static propTypes = {
    input: PropTypes.string.isRequired,
    style: PropTypes.any
  }

  render () {
    const { input, style } = this.props

    return (
      <View style={[ styles.container, style ]}>
        <QRCode
          bgColor="#FFFFFF"
          fgColor="#000000"
          level="L"
          value={input}
        />
      </View>
    )
  }
}
