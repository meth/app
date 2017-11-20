import React, { PureComponent } from 'react'
import { Text } from 'react-native'

import { routes } from '../../../nav'
import logger from '../../../../logger'
import { instanceOfError, UnableToConnectError } from '../../../../utils/errors'
import { t } from '../../../../strings'
import { connectStore } from '../../../helpers/redux'
import styles from './styles'
import ErrorBox from '../../../components/ErrorBox'
import ProgressButton from '../../../components/ProgressButton'
import LinkButton from '../../../components/LinkButton'
import TextInput from '../../../components/TextInput'
import Layout from '../Layout'

const log = logger.create('LoginMnemonic')

@connectStore('nav')
export default class LoginMnemonic extends PureComponent {
  state = {
    mnemonic: 'fringe media suggest gesture intact raise aisle pupil exclude spatial hand lottery',
    // mnemonic: null,
    error: null,
    submitting: false
  }

  render () {
    const { error, submitting } = this.state

    return (
      <Layout contentStyle={styles.layoutContent}>
        <Text style={styles.introText}>{t('mnemonic.enterYourMnemonic')}</Text>
        <TextInput
          style={styles.textInput}
          onChange={this.onChange}
defaultValue={this.state.mnemonic}
          placeholder={t('mnemonic.inputPlaceholderText')}
          onSubmitEditing={this.onSubmit}
        />
        {error ? <ErrorBox error={error} /> : null}
        <ProgressButton
          showInProgress={submitting}
          style={styles.nextButton}
          onPress={this.onSubmit}
          title={t('button.login')} />
        <LinkButton
          textStyle={styles.linkButtonText}
          onPress={this.onPressSignUp}
          title={t('linkButton.dontHavePasswordCreateOne')} />
      </Layout>
    )
  }

  onChange = e => {
    this.setState({
      mnemonic: e.target.value
    })
  }

  onPressSignUp = () => {
    const { actions: { navPush } } = this.props

    navPush(routes.GenerateMnemonic.path)
  }

  onSubmit = () => {
    const { actions: { navPush, loadWallet } } = this.props

    this.setState({
      error: null,
      submitting: true
    }, () => {
      // timeout to give the UI time to re-render
      setTimeout(() => {
        loadWallet(this.state.mnemonic)
          .then(() => navPush(routes.Browser.path))
          .catch(error => {
            log.debug(error)

            if (!instanceOfError(error, UnableToConnectError)) {
              return this.setState({
                error,
                submitting: false
              })
            }

            return navPush(routes.Browser.path)
          })
      })
    })
  }
}
