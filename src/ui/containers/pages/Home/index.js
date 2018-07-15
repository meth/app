import React, { PureComponent } from 'react'
import { Text } from 'react-native'
import * as Animatable from 'react-native-animatable'

import { routes } from '../../../nav'
import { t } from '../../../../../common/strings'
import { getAppName } from '../../../../config'
import { connectStore } from '../../../helpers/redux'
import styles from './styles'
import Button from '../../../components/Button'
import LinkButton from '../../../components/LinkButton'
import Image from '../../../components/Image'
import Layout from '../Layout'

@connectStore()
export default class Home extends PureComponent {
  static navigationOptions = {
    title: getAppName()
  }

  render () {
    return (
      <Layout contentStyle={styles.layoutContent}>
        <Animatable.View
          animation='bounceInDown'
          easing='ease-out'
          duration={1500}
          style={styles.logoView}
        >
          <Image id='logo' resizeMode='contain' style={styles.logoImage} />
        </Animatable.View>
        <Text style={styles.intro2Text}>
          {t('home.intro2')}
        </Text>
        <Button
          style={styles.getStartedButton}
          textStyle={styles.getStartedButtonText}
          onPress={this.onPressStart}
          title={t('button.createNewWallet')} />
        <Button
          textStyle={styles.loginButtonText}
          onPress={this.onPressLogin}
          title={t('linkButton.alreadyHavePasswordLogin')} />
        <LinkButton
          style={styles.linkButton}
          onPress={this._onPressKeystoreFileNano}
          title={t('linkButton.haveKeystoreFileLedgerNano')} />
      </Layout>
    )
  }

  onPressStart = () => {
    const { navGo } = this.props.actions

    navGo(routes.GenerateMnemonic.routeName)
  }

  onPressLogin = () => {
    const { navGo } = this.props.actions

    navGo(routes.LoginMnemonic.routeName)
  }

  _onPressKeystoreFileNano = () => {
    const { showAlert } = this.props.actions

    showAlert(t('home.doesNotSupportWalletTypes'))
  }
}
