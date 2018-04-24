import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { t } from '../../../../common/strings'
import IconButton from '../IconButton'
import styles from './styles'

export default class ChainExplorerIconButton extends PureComponent {
  static propTypes = {
    style: PropTypes.any,
    textStyle: PropTypes.any,
    onPress: PropTypes.func
  }

  render () {
    const { style, textStyle, onPress } = this.props

    return (
      <IconButton
        style={[ styles.button ].concat(style)}
        icon={{ name: 'external-link', style: [ styles.text ].concat(textStyle) }}
        onPress={onPress}
        tooltip={t('button.viewInChainExplorer')}
      />
    )
  }
}
