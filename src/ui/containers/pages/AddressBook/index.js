import _ from 'lodash'
import React from 'react'
import { View, Text } from 'react-native'

import { CachePureComponent } from '../../../helpers/components'
import { getAddressBook } from '../../../../redux/account/selectors'
import { t } from '../../../../../common/strings'
import { connectStore } from '../../../helpers/redux'
import styles from './styles'
import Layout from '../Layout'
import Table from '../../../components/Table'
import Button from '../../../components/Button'
import TitleText from '../../../components/TitleText'

const RENDER_HEADER = () => null

const COLUMNS = [ { id: 'address' } ]


@connectStore('nav', 'account')
export default class AddressBook extends CachePureComponent {
  render () {
    const book = getAddressBook(this.props)

    const rows = Object.keys(book).map(addr => ({
      address: {
        ...book[addr],
        value: addr
      },
      _filterKey: `${addr} ${book[addr].label || ''}`.toLowerCase()
    }))

    return (
      <Layout contentStyle={styles.layoutContent}>
        <View style={styles.titleBar}>
          <TitleText style={styles.titleBarText} text={t('title.addressBook')} />
        </View>
        <Table
          style={styles.table}
          listStyle={styles.tableList}
          rowStyle={styles.tableRow}
          filterInputStyle={styles.tableFilter}
          filterPlaceholderText={t('addressBook.filterPlaceholder')}
          showFilter={true}
          renderHeader={RENDER_HEADER}
          renderRowData={this._renderRowData}
          columns={COLUMNS}
          rows={[
            ...rows,
            ...rows,
            ...rows,
            ...rows,
            ...rows,
            ...rows,
            ...rows,
            ...rows,
            ...rows,
            ...rows,
            ...rows,
            ...rows,
            ...rows,
            ...rows,
            ...rows
          ]}
        />
      </Layout>
    )
  }

  _renderRowData = row => {
    const address = _.get(row, 'address.value')
    const label = _.get(row, 'address.label')

    return (
      <Button
        data-address={address}
        style={styles.tableRowData}
        type='tableRow'
        onPress={this.bind(this.onSelectEntry, address)}
      >
        <Text style={styles.tableRowAddressText}>{address}</Text>
        <Text style={styles.tableRowLabelText}>{label || ' '}</Text>
      </Button>
    )
  }

  onSelectEntry = address => {
    const { showEditAddressModal } = this.props.actions

    showEditAddressModal(address)
  }
}
