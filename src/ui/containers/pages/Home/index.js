import React, { PureComponent } from 'react'
import { Text } from 'react-native'

import { routes } from '../../../nav'
import { t } from '../../../../strings'
import { connectStore } from '../../../helpers/redux'
import styles from './styles'
import Button from '../../../components/Button'
import LinkButton from '../../../components/LinkButton'
import Layout from '../Layout'

@connectStore('nav')
export default class Home extends PureComponent {
  render () {
    return (
      <Layout contentStyle={styles.layoutContent}>
        <Text style={styles.introText}>
          {t('home.intro1')}
        </Text>
        <Text style={styles.introText}>
          {t('home.intro2')}
        </Text>
        <Button
          style={styles.getStartedButton}
          onPress={this.onPressStart}
          title={t('button.getStarted')} />
        <LinkButton
          textStyle={styles.loginLinkButtonText}
          onPress={this.onPressLogin}
          title={t('linkButton.alreadyHavePasswordLogin')} />
      </Layout>
    )
  }

  onPressStart = () => {
    const { actions: { navPush } } = this.props

    navPush(routes.GenerateMnemonic.path)
  }

  onPressLogin = () => {
    const { actions: { navPush } } = this.props

    navPush(routes.LoginMnemonic.path)
  }
}
