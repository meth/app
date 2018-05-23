import React, { PureComponent } from 'react'
import { Text } from 'react-native'

import { t } from '../../../../../common/strings'
import { connectStore } from '../../../helpers/redux'
import styles from './styles'
import Layout from '../Layout'
import PinEntry from '../../../components/PinEntry'
import ConfirmPinModal from '../../../components/ConfirmPinModal'



@connectStore('account')
export default class SetupPin extends PureComponent {
  static navigationOptions = {
    title: t('title.setupPin')
  }

  state = {
    pin: null
  }

  render () {
    return (
      <Layout contentStyle={styles.layoutContent}>
        <Text style={styles.intro1Text}>{t('setupPin.intro1')}</Text>
        <Text style={styles.intro2Text}>{t('setupPin.intro2')}</Text>
        <PinEntry
          ref={this._onPinEntryRef}
          style={styles.pin}
          onPinEntered={this._onPinEntered}
        />
        <ConfirmPinModal
          ref={this._onConfirmModalRef}
          title={t('modal.confirmPin.pleaseConfirmYourPin')}
          onSuccess={this._onConfirmationSuccess}
          onCancel={this._onConfirmationFailure}
        />
      </Layout>
    )
  }

  _onPinEntryRef = ref => {
    this.pinEntry = ref
  }

  _onConfirmModalRef = ref => {
    this.confirmModal = ref
  }

  _onConfirmationSuccess = () => {
    console.warn('success!')
  }

  _onConfirmationFailure = () => {
    this.pinEntry.reset()
  }

  _onPinEntered = pin => {
    this.confirmModal.show(pin)
  }
}
