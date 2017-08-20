import React, { Component } from 'react'
import { Text } from 'react-native'

import { routes } from '../../nav'
import controller from '../../../redux/controller'
import { t } from '../../../../common/strings'
import { connectRedux } from '../../helpers/decorators'
import styles from './styles'
import Layout from '../Layout'
import Button from '../../components/Button'



@connectRedux()
export default class Page extends Component {
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
