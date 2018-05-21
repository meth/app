import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { View, Text, Clipboard } from 'react-native'

import { t } from '../../../../common/strings'
import { toast } from '../../../env'
import IconButton from '../IconButton'
import styles from './styles'

export default class CopyableText extends PureComponent {
  static propTypes = {
    text: PropTypes.string.isRequired,
    style: PropTypes.any,
    textStyle: PropTypes.any,
    buttonStyle: PropTypes.any
  }

  render () {
    const { text, style, textStyle, buttonStyle } = this.props

    return (
      <View style={[ styles.container, style ]}>
        <Text style={[ styles.text, textStyle ]}>{text}</Text>
        <IconButton
          style={[ styles.button ].concat(buttonStyle)}
          icon={{ name: 'md-copy' }}
          onPress={this._onPressCopy}
          tooltip={t('button.copyToClipboard')}
        />
      </View>
    )
  }

  _onPressCopy = () => {
    const { text } = this.props

    Clipboard.setString(text)

    toast(t('toast.copiedToClipboard'))
  }
}
