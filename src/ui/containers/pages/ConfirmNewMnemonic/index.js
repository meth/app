import React, { PureComponent } from 'react'
import { Text } from 'react-native'

import logger from '../../../../utils/log'
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

@connectStore('nav', 'wallet', 'modals')
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
        <Button
          disabled={!success}
          onPress={this.onProceed}
          title={t('button.iHaveConfirmedMyMnemonic')}
        />
        {errorBox}
      </Layout>
    )
  }

  onSuccessfulConfirmation = () => {
    this.setState({ success: true })
  }

  onProceed = () => {
    const { success } = this.state

    const {
      navigation: { currentRoute: { params: { mnemonic } } },
      actions: { navPush, loadWallet, alert }
    } = this.props

    if (!success) {
      return alert({
        error: t('mnemonic.wordOrderStillIncorrect')
      })
    }

    return this.setState({ error: null }, () => {
      loadWallet(mnemonic)
        .then(() => navPush(routes.Browser.path))
        .catch(error => {
          log.debug(error)

          if (!instanceOfError(error, UnableToConnectError)) {
            return this.setState({ error })
          }

          return navPush(routes.Browser.path)
        })
    })
  }
}
