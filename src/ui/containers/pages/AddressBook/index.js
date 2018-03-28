import React, { PureComponent } from 'react'
import { View, Text } from 'react-native'

import { t } from '../../../../../common/strings'
import { connectStore } from '../../../helpers/redux'
import styles from './styles'
import Layout from '../Layout'
import Table from '../../../components/Table'
import IconButton from '../../../components/IconButton'

const RENDER_NULL = () => null

@connectStore('nav')
export default class AddressBook extends PureComponent {
  render () {
    return (
      <Layout contentStyle={styles.layoutContent}>
        <View style={styles.titleBar}>
          <Text style={styles.titleBarText}>{t('nav.addressBook')}</Text>
          <IconButton
            style={styles.titleBarAddButton}
            icon={{ name: 'plus', style: styles.titleBarAddIcon }}
          />
        </View>
        <Table
          style={styles.table}
          showFilter={true}
          renderHeader={RENDER_NULL}
          columns={[
            {
              id: 'address'
            }
          ]}
          rows={[
            {
              address: {
                value: 'test1'
              },
              _filterKey: 'test1'
            },
            {
              address: {
                value: 'test2'
              },
              _filterKey: 'test2'
            },
            {
              address: {
                value: 'test3'
              },
              _filterKey: 'test3'
            }
          ]}
        />
      </Layout>
    )
  }
}
