import React, { PureComponent } from 'react'
import { Text } from 'react-native'

import { routes } from '../../../nav'
import { t } from '../../../../../common/strings'
import { getAppName } from '../../../../config'
import { connectStore } from '../../../helpers/redux'
import styles from './styles'
import Button from '../../../components/Button'
import Image from '../../../components/Image'
import Layout from '../Layout'

@connectStore()
export default class Home extends PureComponent {
  static navigationOptions = {
    title: getAppName()
  }

  render () {
    return (
      <Layout contentStyle={styles.layoutContent} showSplashBackground={true}>
        <Image id='logo' style={styles.logo} resizeMode='contain' />
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
}
