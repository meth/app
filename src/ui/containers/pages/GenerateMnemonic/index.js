import React, { PureComponent } from 'react'
import { Text } from 'react-native'

import { routes } from '../../../nav/routes'
import { addRouteListener } from '../../../nav'
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
  static navigationOptions = {
    title: t('title.createWallet')
  }

  state = {
    mnemonic: null,
    error: null
  }

  componentDidMount () {
    this._generateMnemonic()

    // every time we return to this screen we want to re-generate the mnemonic
    this._routeListener = addRouteListener('GenerateMnemonic', this._generateMnemonic)
  }

  componentWillUnmount () {
    if (this._routeListener) {
      this._routeListener.remove()
    }
  }

  render () {
    const { error, mnemonic, revealed } = this.state

    return (
      <Layout contentStyle={styles.layoutContent}>
        <Text style={styles.intro1Text}>{t('mnemonic.intro1')}</Text>
        <Text style={styles.intro2Text}>{t('mnemonic.intro2')}</Text>
        {(!mnemonic) ? <Loading /> : (
          <MnemonicDisplay
            mnemonic={mnemonic}
            style={styles.mnemonic}
            onPress={this._onPressRevealMnemonic}
          />
        )}
        {error ? <ErrorBox error={error} /> : null}
        {(!mnemonic || !revealed) ? null : (
          <Button
            style={styles.nextButton}
            onPress={this.onPressConfirm}
            title={t('button.iHaveWrittenDownMnemonic')}
          />
        )}
        <Button
          style={styles.loginButton}
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

  _onPressRevealMnemonic = () => {
    this.setState({
      revealed: true
    })
  }

  _generateMnemonic = () => {
    const { generateMnemonic } = this.props.actions

    generateMnemonic()
      .then(mnemonic => this.setState({ mnemonic }))
      .catch(error => this.setState({ error }))
  }
}
