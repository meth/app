import React, { PureComponent } from 'react'
import { Text } from 'react-native'

import { routes } from '../../nav'
import controller from '../../../redux/controller'
import { t } from '../../../../common/strings'
import styles from './styles'
import Layout from '../Layout'
import Button from '../../components/Button'



export default class Page extends PureComponent {
  render () {
    const {
      navigation: {
        currentRoute: {
          params: { mnemonic }
        }
      }
    } = this.props

    return (
      <Layout>
        <Text>{t('mnemonic.pleaseNoteDownThisMnemonicOnPaperOffline')}</Text>
        <Text style={styles.mnemonic}>{mnemonic}</Text>
        <Button onPress={this.onProceed} title={t('button.iHaveNotedDownMyMnemonicAndWishToProceed')} />
      </Layout>
    )
  }

  onProceed = () => {
    controller.nav.push(routes.Browser.path)
      .catch(() => {})
  }
}
