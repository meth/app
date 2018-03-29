import _ from 'lodash'
import React, { PureComponent } from 'react'
import { View, Text } from 'react-native'

import { t } from '../../../../../common/strings'
import { connectStore } from '../../../helpers/redux'
import styles from './styles'
import Layout from '../Layout'
import Table from '../../../components/Table'
import Button from '../../../components/Button'
import IconButton from '../../../components/IconButton'

const RENDER_NULL = () => null

const ROWS = [
  {
    address: {
      value: '0xdcc703c0E500B653Ca82273B7BFAd8045D85a470'
    },
    label: {
      value: 'Friendly label 1'
    },
    _filterKey: '0xdcc703c0e500b653ca82273b7bfad8045d85a470 friendly label 1'
  },
  {
    address: {
      value: '0xdcc703c0E500B653Ca82273B7BFAd8045D85a471'
    },
    _filterKey: '0xdcc703c0e500b653ca82273b7bfad8045d85a471'
  },
  {
    address: {
      value: '0xdcc703c0E500B653Ca82273B7BFAd8045D85a472'
    },
    label: {
      value: 'Bancor network'
    },
    _filterKey: '0xdcc703c0e500b653ca82273b7bfad8045d85a472 bancor network'
  }
]

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
            tooltip={t('button.addEntry')}
          />
        </View>
        <Table
          style={styles.table}
          listStyle={styles.tableList}
          rowStyle={styles.tableRow}
          filterInputStyle={styles.tableFilter}
          filterPlaceholderText={t('addressBook.filterPlaceholder')}
          showFilter={true}
          renderHeader={RENDER_NULL}
          renderRowData={this._renderRowData}
          columns={[
            {
              id: 'address'
            }
          ]}
          rows={[
            ...ROWS,
            ...ROWS,
            ...ROWS,
            ...ROWS,
            ...ROWS,
            ...ROWS,
            ...ROWS,
            ...ROWS,
            ...ROWS,
            ...ROWS,
            ...ROWS,
            ...ROWS,
            ...ROWS,
            ...ROWS,
            ...ROWS
          ]}
        />
      </Layout>
    )
  }

  _renderRowData = row => {
    const address = _.get(row, 'address.value')
    const label = _.get(row, 'label.value')

    return (
      <Button style={styles.tableRowData} type='tableRow'>
        <Text style={styles.tableRowAddressText}>{address}</Text>
        <Text style={styles.tableRowLabelText}>{label || ' '}</Text>
      </Button>
    )
  }
}
