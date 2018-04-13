import React, { PureComponent } from 'react'
import { Text } from 'react-native'

import { t } from '../../../../../common/strings'
import { connectStore } from '../../../helpers/redux'
import Modal from '../../../components/Modal'
import ProgressButton from '../../../components/ProgressButton'
import ErrorBox from '../../../components/ErrorBox'
import styles from './styles'

@connectStore('modals')
export default class AddAccount extends PureComponent {
  state = {
    submitting: false,
    error: null
  }

  render () {
    const { submitting, error } = this.state

    return (
      <Modal
        contentStyle={styles.content}
        onPressCloseButton={this.close}
      >
        <Text style={styles.text}>{t('modal.addAccount.cta')}</Text>
        <ProgressButton
          style={styles.button}
          showInProgress={submitting}
          onPress={this._onPressGenerate}
          title={t('button.generateAccount')}
        />
        <ErrorBox style={styles.errorBox} error={error} />
      </Modal>
    )
  }

  _onPressGenerate = () => {
    const { generateAccount } = this.props.actions

    this.setState({
      submitting: true,
      error: null
    }, () => {
      generateAccount()
        .then(() => this.close())
        .catch(error => {
          this.setState({
            submitting: false,
            error
          })
        })
    })
  }

  close = () => {
    const { hideAddAccountModal } = this.props.actions

    hideAddAccountModal()
  }
}
