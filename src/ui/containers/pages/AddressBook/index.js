import React, { PureComponent } from 'react'

import { connectStore } from '../../../helpers/redux'
import styles from './styles'
import Layout from '../Layout'
import Table from '../../../components/Table'

const RENDER_NULL = () => null

@connectStore('nav')
export default class AddressBook extends PureComponent {
  render () {
    return (
      <Layout contentStyle={styles.layoutContent}>
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
