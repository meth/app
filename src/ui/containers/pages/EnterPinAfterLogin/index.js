import React, { PureComponent } from 'react'
import { Text } from 'react-native'

import { t } from '../../../../../common/strings'
import { connectStore } from '../../../helpers/redux'
import styles from './styles'
import Layout from '../Layout'

@connectStore('account')
export default class SetupPin extends PureComponent {
  static navigationOptions = {
    title: t('title.enterPin')
  }

  render () {
    return (
      <Layout contentStyle={styles.layoutContent}>
        <Text>Enter pin after login</Text>
      </Layout>
    )
  }
}
