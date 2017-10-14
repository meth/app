import React, { PureComponent } from 'react'
import { Text } from 'react-native'

import { load as loadWallet } from '../../../../wallet/manager'
import logger from '../../../../utils/log'
import { routes } from '../../../nav'
import { connectStore } from '../../../helpers/redux'
import { t } from '../../../../../common/strings'
import styles from './styles'
import Layout from '../Layout'
import Button from '../../../components/Button'
import ErrorBox from '../../../components/ErrorBox'

const log = logger.create('ConfirmNewMnemonic')

@connectStore('nav')
export default class ConfirmNewMnemonic extends PureComponent {
  state = {
    error: ''
  }

  render () {
    const {
      navigation: { currentRoute: { params: { mnemonic } } }
    } = this.props

    const { error } = this.state

    const errorBox = !error ? null : <ErrorBox error={error} />

    return (
      <Layout>
        <Text>{t('mnemonic.pleaseNoteDownThisMnemonicOnPaperOffline')}</Text>
        <Text style={styles.mnemonic}>{mnemonic}</Text>
        <Button
          onPress={this.onProceed}
          title={t('button.iHaveNotedDownMyMnemonicAndWishToProceed')}
        />
        {errorBox}
      </Layout>
    )
  }

  onProceed = () => {
    const {
      navigation: { currentRoute: { params: { mnemonic } } },
      actions: { navPush }
    } = this.props

    this.setState({ error: null }, () => {
      loadWallet(mnemonic)
        .then(() => navPush(routes.Browser.path))
        .catch(error => {
          log.debug(error)

          this.setState({ error })
        })
    })
  }
}
