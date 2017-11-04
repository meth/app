import React, { PureComponent } from 'react'
import { Text } from 'react-native'

import { routes } from '../../../nav'
import { t } from '../../../../../common/strings'
import { connectStore } from '../../../helpers/redux'
import styles from './styles'
import ErrorBox from '../../../components/ErrorBox'
import Button from '../../../components/Button'
import Loading from '../../../components/Loading'
import Mnemonic from '../../../components/Mnemonic'
import Layout from '../Layout'

@connectStore('nav', 'wallet')
export default class GenerateMnemonic extends PureComponent {
  state = {
    mnemonic: null,
    error: null
  }

  componentDidMount () {
    const { generateMnemonic } = this.props.actions

    generateMnemonic()
      .then(mnemonic => this.setState({ mnemonic }))
      .catch(error => this.setState({ error }))
  }

  render () {
    const { error, mnemonic } = this.state

    return (
      <Layout contentStyle={styles.layoutContent}>
        <Text style={styles.intro1Text}>{t('mnemonic.intro1')}</Text>
        <Text style={styles.intro2Text}>{t('mnemonic.intro2')}</Text>
        <Text style={styles.intro3Text}>{t('mnemonic.intro3')}</Text>
        {(!mnemonic) ? <Loading /> : (
          <Mnemonic mnemonic={mnemonic} style={styles.mnemonic} />
        )}
        {(!mnemonic) ? null : (
          <Button
            style={styles.nextButton}
            onPress={this.onPressConfirm}
            title={t('button.iHaveWrittenDownMnemonic')}
          />
        )}
        {error ? <ErrorBox error={error} /> : null}
      </Layout>
    )
  }

  onPressConfirm = () => {
    const { actions: { navPush } } = this.props

    const { mnemonic } = this.state

    navPush(routes.ConfirmNewMnemonic.path, { mnemonic })
  }
}
