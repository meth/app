import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Text } from 'react-native'

import { connectStore } from '../../../helpers/redux'
import { t } from '../../../../../common/strings'
import { openExternalUrl } from '../../../../env'
import Modal from '../../../components/Modal'
import Button from '../../../components/Button'
import styles from './styles'


@connectStore()
export default class UpdateAvailable extends PureComponent {
  static propTypes = {
    data: PropTypes.shape({
      version: PropTypes.string.isRequired,
      updateUrl: PropTypes.string.isRequired
    }).isRequired
  }

  render () {
    const { data: { version } } = this.props

    return (
      <Modal
        contentStyle={styles.content}
        contentScrollContainerStyle={styles.scrollContainerContent}
        onPressCloseButton={this.close}
      >
        <Text style={styles.text}>{t('modal.updateAvailable.updateIsAvailable', { version })}</Text>
        <Button
          onPress={this._gotoUpdate}
          title={t('button.getUpdate')}
        />
      </Modal>
    )
  }

  close = () => {
    const { hideUpdateAvailableModal } = this.props.actions

    hideUpdateAvailableModal()
  }

  _gotoUpdate = () => {
    const { data: { updateUrl } } = this.props

    openExternalUrl(updateUrl)
  }
}
