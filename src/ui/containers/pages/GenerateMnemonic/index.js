import React, { PureComponent } from 'react'

import { generateNewMnemonic } from '../../../../wallet/manager'
import { routes } from '../../../nav'
import logger from '../../../../utils/log'
import { t } from '../../../../../common/strings'
import { connectStore } from '../../../helpers/redux'
import styles from './styles'
import ErrorBox from '../../../components/ErrorBox'
import Button from '../../../components/Button'
import Layout from '../Layout'

const log = logger.create('GenerateMnemonic')

@connectStore('nav')
export default class GenerateMnemonic extends PureComponent {
  state = {
    mnemonic: '',
    error: null
  }

  render () {
    const { error } = this.state

    return (
      <Layout contentStyle={styles.layoutContent}>
        <Button
          onPress={this.onGenerate}
          title={t('button.generateNewMnemonic')}
        />
        {error ? <ErrorBox error={error} /> : null}
      </Layout>
    )
  }

  onGenerate = () => {
    const { actions: { navPush } } = this.props

    this.setState({ error: null }, () => {
      generateNewMnemonic()
        .then(mnemonic => (
          navPush(routes.ConfirmNewMnemonic.path, { mnemonic })
        ))
        .catch(error => {
          log.debug(error)

          this.setState({ error })
        })
    })
  }
}
