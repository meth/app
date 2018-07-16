import React, { PureComponent } from 'react'
import { Text } from 'react-native'

import { addRouteListener, routes } from '../../../nav'
import { t } from '../../../../../common/strings'
import { connectStore } from '../../../helpers/redux'
import styles from './styles'
import ErrorBox from '../../../components/ErrorBox'
import AlertBox from '../../../components/AlertBox'
import Button from '../../../components/Button'
import Loading from '../../../components/Loading'
import { MnemonicDisplay } from '../../../components/Mnemonic'
import Layout from '../Layout'

@connectStore('account')
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

    // whenever we hit this screen we want to re-generate the mnemonic
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
        <AlertBox
          type='info'
          text={t('mnemonic.intro2')}
          style={styles.introAlertBox}
        />
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
            textStyle={styles.nextButtonText}
            onPress={this.onPressConfirm}
            title={t('button.iHaveWrittenDownMnemonic')}
          />
        )}
        <Button
          style={styles.goBackButton}
          textStyle={styles.goBackButtonText}
          onPress={this.onPressGoBack}
          title={t('button.goBack')} />
      </Layout>
    )
  }

  onPressGoBack = () => {
    const { navGo } = this.props.actions

    navGo(routes.Home.routeName)
  }

  onPressConfirm = () => {
    const { mnemonic } = this.state

    const { navGo } = this.props.actions

    navGo(routes.ConfirmNewMnemonic.routeName, { mnemonic })
  }

  _onPressRevealMnemonic = () => {
    this.setState({
      revealed: true
    })
  }

  _generateMnemonic = () => {
    const { generateMnemonic } = this.props.actions

    this.setState({
      mnemonic: null,
      revealed: false
    }, () => {
      generateMnemonic()
        .then(mnemonic => this.setState({ mnemonic }))
        .catch(error => this.setState({ error }))
    })
  }
}
