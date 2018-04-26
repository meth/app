import React, { PureComponent } from 'react'

import { t } from '../../../../../common/strings'
import { connectStore } from '../../../helpers/redux'
import styles from './styles'
import Layout from '../Layout'
import TitleText from '../../../components/TitleText'


@connectStore('account')
export default class AddressBook extends PureComponent {
  render () {
    return (
      <Layout contentStyle={styles.layoutContent}>
        <TitleText text={t('title.contracts')} />
      </Layout>
    )
  }
}
