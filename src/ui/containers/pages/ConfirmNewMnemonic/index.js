import React, { PureComponent } from 'react'
import { Text } from 'react-native'

import logger from '../../../../logger'
import { instanceOfError, UnableToConnectError } from '../../../../utils/errors'
import { routes } from '../../../nav'
import { connectStore } from '../../../helpers/redux'
import { t } from '../../../../../common/strings'
import styles from './styles'
import Layout from '../Layout'
import Button from '../../../components/Button'
import ErrorBox from '../../../components/ErrorBox'
import { MnemonicConfirmator } from '../../../components/Mnemonic'

const log = logger.create('ConfirmNewMnemonic')

@connectStore('nav', 'account', 'modals')
export default class ConfirmNewMnemonic extends PureComponent {
  state = {
    success: false,
    error: null
  }

  render () {
    const {
      navigation: { currentRoute: { params: { mnemonic } } }
    } = this.props

    const { error, success } = this.state

    const errorBox = (!error) ? null : (
      <ErrorBox error={error} />
    )

    return (
      <Layout contentStyle={styles.layoutContent}>
        <Text style={styles.intro1Text}>{t('mnemonic.pleaseConfirmYourMnemonic')}</Text>
        <Text style={styles.intro2Text}>{t('mnemonic.putWordsInRightOrder')}</Text>
        <MnemonicConfirmator
          onSuccess={this.onSuccessfulConfirmation}
          style={styles.confirmator}
          mnemonic={mnemonic}
        />
        {errorBox}
        <Button
          style={styles.nextButton}
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
    const {
      actions: { navBack }
    } = this.props

    navBack()
  }

  onProceed = () => {
    const {
      navigation: { currentRoute: { params: { mnemonic } } },
      actions: { navPush, loadWallet }
    } = this.props

    const postSuccessPath = routes.OnceLoggedIn.path

    return this.setState({ error: null }, () => {
      loadWallet(mnemonic)
        .then(() => navPush(postSuccessPath))
        .catch(error => {
          log.debug(error)

          if (!instanceOfError(error, UnableToConnectError)) {
            return this.setState({ error })
          }

          return navPush(postSuccessPath)
        })
    })
  }
}
