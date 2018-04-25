import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { connectStore } from '../../../helpers/redux'
import { t } from '../../../../../common/strings'
import IconButton from '../../../components/IconButton'
import styles from './styles'


@connectStore()
export default class AddAddressBookEntryIconButton extends PureComponent {
  static propTypes = {
    value: PropTypes.string.isRequired,
    style: PropTypes.any,
    textStyle: PropTypes.any
  }

  render () {
    const { style, textStyle } = this.props

    return (
      <IconButton
        style={[ styles.button ].concat(style)}
        icon={{ name: 'account-multiple-plus', style: [ styles.text ].concat(textStyle) }}
        onPress={this._onPress}
        tooltip={t('button.addToAddressBook')}
      />
    )
  }

  _onPress = () => {
    const { value } = this.props
    const { showEditAddressModal } = this.props.actions

    showEditAddressModal(value)
  }
}
