import React, { PureComponent } from 'react'
import { Text } from 'react-native'

import { t } from '../../../../../common/strings'
import { connectStore } from '../../../helpers/redux'
import { toast } from '../../../../env'
import styles from './styles'
import Layout from '../Layout'
import PinEntry from '../../../components/PinEntry'
import ErrorBox from '../../../components/ErrorBox'
import Loading from '../../../components/Loading'
import ConfirmPinModal from '../../../components/ConfirmPinModal'



@connectStore('config')
export default class SetupPin extends PureComponent {
  static navigationOptions = {
    title: t('title.setupPin')
  }

  state = {
    pin: null,
    saving: false,
    error: null
  }

  render () {
    const { error, saving } = this.state

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
        {saving ? <Loading style={styles.loadingIndicator} /> : null}
        <ErrorBox style={styles.errorBox} error={error} />
      </Layout>
    )
  }

  _onPinEntryRef = ref => {
    this.pinEntry = ref
  }

  _onConfirmModalRef = ref => {
    this.confirmModal = ref
  }

  _onConfirmationSuccess = pin => {
    const { navPostPin, savePin } = this.props.actions

    this.setState({
      saving: true,
      error: null
    }, () => {
      savePin(pin)
        .then(() => {
          this.setState({
            saving: false,
            error: null
          })

          toast(t('toast.pinSetupSuccessfully'))

          navPostPin()
        })
        .catch(error => {
          this.setState({
            saving: false,
            error
          })
        })
    })
  }

  _onConfirmationFailure = () => {
    this.pinEntry.reset()
  }

  _onPinEntered = pin => {
    this.confirmModal.show(pin)
  }
}
