import _ from 'lodash'
import React, { PureComponent } from 'react'
import { Text } from 'react-native'

import logger from '../../../../logger'
import { routes } from '../../../nav'
import { instanceOfError, UnableToConnectError } from '../../../../utils/errors'
import { connectStore } from '../../../helpers/redux'
import { t } from '../../../../../common/strings'
import styles from './styles'
import Layout from '../Layout'
import Button from '../../../components/Button'
import ErrorBox from '../../../components/ErrorBox'
import { MnemonicConfirmator } from '../../../components/Mnemonic'

const log = logger.create('ConfirmNewMnemonic')

@connectStore('account', 'modals')
export default class ConfirmNewMnemonic extends PureComponent {
  static navigationOptions = {
    title: t('title.confirmWallet')
  }

  state = {
    success: false,
    error: null
  }

  render () {
    const { mnemonic } = _.get(this.props.navigation, 'state.params', {})

    const { error, success } = this.state

    const errorBox = (!error) ? null : (
      <ErrorBox error={error} />
    )

    return (
      <Layout contentStyle={styles.layoutContent} showSplashBackground={true}>
        <Text style={styles.intro1Text}>{t('mnemonic.pleaseConfirmYourMnemonic')}</Text>
        <Text style={styles.intro2Text}>{t('mnemonic.putWordsInRightOrder')}</Text>
        <MnemonicConfirmator
          onSuccess={this.onSuccessfulConfirmation}
          style={styles.confirmator}
          mnemonic={mnemonic || ''}
        />
        {errorBox}
        <Button
          style={styles.nextButton}
          textStyle={styles.nextButtonText}
          disabled={!success}
          onPress={this.onProceed}
          onDisabledPress={this.onCantProceed}
          title={t('button.iHaveConfirmedMyMnemonic')}
        />
        <Button
          textStyle={styles.goBackButtonText}
          onPress={this.onPressGoBack}
          title={t('linkButton.goBackAndGenerateAnotherMnemonic')} />
      </Layout>
    )
  }

  onSuccessfulConfirmation = () => {
    this.setState({ success: true })
  }

  onCantProceed = () => {
    const {
      actions: { showErrorAlert }
    } = this.props

    return showErrorAlert(t('mnemonic.wordOrderStillIncorrect'))
  }

  onPressGoBack = () => {
    const { navGo } = this.props.actions

    navGo(routes.GenerateMnemonic.routeName)
  }

  onProceed = () => {
    const { navPostLogin, loadWallet } = this.props.actions
    const mnemonic = this._getMnemonic()

    return this.setState({ error: null }, () => {
      loadWallet(mnemonic)
        .then(() => navPostLogin())
        .catch(error => {
          log.debug(error)

          if (!instanceOfError(error, UnableToConnectError)) {
            return this.setState({ error })
          }

          return navPostLogin()
        })
    })
  }

  _getMnemonic () {
    const { mnemonic } = _.get(this.props.navigation, 'state.params', {})

    return mnemonic
  }
}
