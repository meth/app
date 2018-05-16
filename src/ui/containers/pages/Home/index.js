import React, { PureComponent } from 'react'
import { Text } from 'react-native'

import { routes } from '../../../nav'
import { t } from '../../../../../common/strings'
import { getAppName } from '../../../../config'
import { connectStore } from '../../../helpers/redux'
import styles from './styles'
import Button from '../../../components/Button'
import Layout from '../Layout'

@connectStore('nav')
export default class Home extends PureComponent {
  static navigationOptions = {
    title: getAppName()
  }

  render () {
    return (
      <Layout contentStyle={styles.layoutContent}>
        <Text style={styles.intro1Text}>
          {t('home.intro1')}
        </Text>
        <Text style={styles.intro2Text}>
          {t('home.intro2')}
        </Text>
        <Button
          style={styles.getStartedButton}
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
