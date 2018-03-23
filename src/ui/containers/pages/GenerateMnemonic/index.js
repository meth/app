import React, { PureComponent } from 'react'
import { Text } from 'react-native'

import { routes } from '../../../nav'
import { t } from '../../../../../common/strings'
import { connectStore } from '../../../helpers/redux'
import styles from './styles'
import ErrorBox from '../../../components/ErrorBox'
import Button from '../../../components/Button'
import Loading from '../../../components/Loading'
import { MnemonicDisplay } from '../../../components/Mnemonic'
import Layout from '../Layout'

@connectStore('nav', 'account')
export default class GenerateMnemonic extends PureComponent {
  state = {
    mnemonic: null,
    error: null
  }

  componentDidMount () {
    const { generateMnemonic } = this.props.actions

    generateMnemonic()
      .then(mnemonic => this.setState({ mnemonic }))
      .catch(error => this.setState({ error }))
  }

  render () {
    const { error, mnemonic } = this.state

    return (
      <Layout contentStyle={styles.layoutContent}>
        <Text style={styles.intro1Text}>{t('mnemonic.intro1')}</Text>
        <Text style={styles.intro2Text}>{t('mnemonic.intro2')}</Text>
        {(!mnemonic) ? <Loading /> : (
          <MnemonicDisplay mnemonic={mnemonic} style={styles.mnemonic} />
        )}
        {error ? <ErrorBox error={error} /> : null}
        {(!mnemonic) ? null : (
          <Button
            style={styles.nextButton}
            onPress={this.onPressConfirm}
            title={t('button.iHaveWrittenDownMnemonic')}
          />
        )}
        <Button
          textStyle={styles.loginButtonText}
          onPress={this.onPressLogin}
          title={t('linkButton.alreadyHavePasswordLogin')} />
      </Layout>
    )
  }

  onPressLogin = () => {
    const { actions: { navPush } } = this.props

    navPush(routes.LoginMnemonic.path)
  }

  onPressConfirm = () => {
    const { actions: { navPush } } = this.props

    const { mnemonic } = this.state

    navPush(routes.ConfirmNewMnemonic.path, { mnemonic })
  }
}
