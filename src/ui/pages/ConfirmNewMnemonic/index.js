import React, { PureComponent } from 'react'
import { Text } from 'react-native'

import { routes } from '../../nav'
import controller from '../../../redux/controller'
import { t } from '../../../../common/strings'
import styles from './styles'
import Layout from '../Layout'
import Button from '../../components/Button'
import ErrorBox from '../../components/ErrorBox'



export default class Page extends PureComponent {
  state = {
    error: '',
  }

  render () {
    const {
      navigation: {
        currentRoute: {
          params: { mnemonic }
        }
      }
    } = this.props

    const { error } = this.state

    const errorBox = (!error) ? null : (
      <ErrorBox error={error} />
    )

    return (
      <Layout>
        <Text>{t('mnemonic.pleaseNoteDownThisMnemonicOnPaperOffline')}</Text>
        <Text style={styles.mnemonic}>{mnemonic}</Text>
        <Button onPress={this.onProceed} title={t('button.iHaveNotedDownMyMnemonicAndWishToProceed')} />
        {errorBox}
      </Layout>
    )
  }

  onProceed = () => {
    this.setState({ error: null }, () => {
      controller.wallet.loadUsingMnemonic(this.state.mnemonic)
        .then(() => controller.nav.push(routes.Browser.path))
        .catch(error => this.setState({ error }))
    })
  }
}
