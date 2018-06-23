import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Clipboard } from 'react-native'

import { t } from '../../../../common/strings'
import { toast } from '../../../env'
import IconButton from '../IconButton'
import styles from './styles'

export default class CopyToClipboardButton extends PureComponent {
  static propTypes = {
    text: PropTypes.string.isRequired,
    style: PropTypes.any
  }

  render () {
    const { style } = this.props

    return (
      <IconButton
        style={[ styles.button ].concat(style)}
        icon={{ name: 'md-copy' }}
        onPress={this._onPressCopy}
        tooltip={t('button.copyToClipboard')}
      />
    )
  }

  _onPressCopy = () => {
    const { text } = this.props

    Clipboard.setString(text)

    toast(t('toast.copiedToClipboard'))
  }
}
