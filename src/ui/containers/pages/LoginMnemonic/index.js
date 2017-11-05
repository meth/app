import React, { PureComponent } from 'react'
import { Text } from 'react-native'

import { routes } from '../../../nav'
import logger from '../../../../utils/log'
import { instanceOfError, UnableToConnectError } from '../../../../utils/errors'
import { t } from '../../../../../common/strings'
import { connectStore } from '../../../helpers/redux'
import styles from './styles'
import ErrorBox from '../../../components/ErrorBox'
import Button from '../../../components/Button'
import LinkButton from '../../../components/LinkButton'
import TextInput from '../../../components/TextInput'
import Layout from '../Layout'

const log = logger.create('LoginMnemonic')

@connectStore('nav')
export default class LoginMnemonic extends PureComponent {
  state = {
    mnemonic: null,
    error: null
  }

  render () {
    const { error } = this.state

    return (
      <Layout contentStyle={styles.layoutContent}>
        <Text style={styles.introText}>{t('mnemonic.enterYourMnemonic')}</Text>
        <TextInput
          style={styles.textInput}
          onChange={this.onChange}
          placeholder={t('mnemonic.inputPlaceholderText')}
          onSubmitEditing={this.onSubmit}
        />
        {error ? <ErrorBox error={error} /> : null}
        <Button
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

    this.setState({ error: null }, () => {
      loadWallet(this.state.mnemonic)
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
