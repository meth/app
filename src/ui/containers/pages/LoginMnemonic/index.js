import React, { PureComponent } from 'react'
import { Text } from 'react-native'

import { routes } from '../../../nav'
import logger from '../../../../utils/log'
import { instanceOfError, UnableToConnectError } from '../../../../utils/errors'
import { t } from '../../../../../common/strings'
import { connectStore } from '../../../helpers/redux'
import styles from './styles'
import ErrorBox from '../../../components/ErrorBox'
import Button from '../../../components/Button'
import TextInput from '../../../components/TextInput'
import Layout from '../Layout'

const log = logger.create('LoginMnemonic')

@connectStore('nav')
export default class LoginMnemonic extends PureComponent {
  state = {
    mnemonic: '',
    error: null
  }

  render () {
    const { error, mnemonic } = this.state

    return (
      <Layout contentStyle={styles.layoutContent}>
        <Text>{t('mnemonic.enterYourMnemonic')}</Text>
        <TextInput
          style={styles.textInput}
          defaultValue={mnemonic}
          onChange={this.onChange}
          onSubmitEditing={this.onSubmit}
        />
        <Button onPress={this.onSubmit} title={t('button.login')} />
        {error ? <ErrorBox error={error} /> : null}
      </Layout>
    )
  }

  onChange = e => {
    this.setState({
      mnemonic: e.target.value
    })
  }

  onSubmit = () => {
    const { actions: { navPush, loadWallet } } = this.props

    this.setState({ error: null }, () => {
      loadWallet(this.state.mnemonic)
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
