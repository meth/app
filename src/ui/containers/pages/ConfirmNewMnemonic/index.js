import React, { PureComponent } from 'react'
import { Text } from 'react-native'

import logger from '../../../../utils/log'
import { instanceOfError, UnableToConnectError } from '../../../../utils/errors'
import { routes } from '../../../nav'
import { connectStore } from '../../../helpers/redux'
import { t } from '../../../../../common/strings'
import styles from './styles'
import Layout from '../Layout'
import Button from '../../../components/Button'
import ErrorBox from '../../../components/ErrorBox'

const log = logger.create('ConfirmNewMnemonic')

@connectStore('nav', 'wallet')
export default class ConfirmNewMnemonic extends PureComponent {
  state = {
    error: ''
  }

  render () {
    const {
      navigation: { currentRoute: { params: { mnemonic } } }
    } = this.props

    const { error } = this.state

    const errorBox = (!error) ? null : (
      <ErrorBox error={error} />
    )

    return (
      <Layout contentStyle={styles.layoutContent}>
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
      actions: { navPush, loadWallet }
    } = this.props

    this.setState({ error: null }, () => {
      loadWallet(mnemonic)
        .then(() => navPush(routes.Browser.path))
        .catch(error => {
          log.debug(error)

          if (!instanceOfError(error, UnableToConnectError)) {
            return this.setState({ error })
          }

          return navPush(routes.Browser.path)
        })
    })
  }
}
