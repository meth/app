import _ from 'lodash'
import React from 'react'

import { CachePureComponent } from '../../../helpers/components'
import { t } from '../../../../../common/strings'
import { connectStore } from '../../../helpers/redux'
import styles from './styles'
import Layout from '../Layout'
import Table from '../../../components/Table'
import Button from '../../../components/Button'
import LabelledAddress from '../../../components/LabelledAddress'
import TitleText from '../../../components/TitleText'

const RENDER_HEADER = () => null

const COLUMNS = [ { id: 'address' } ]


@connectStore('nav', 'account')
export default class AddressBook extends CachePureComponent {
  render () {
    const { getAddressBook } = this.props.selectors

    const book = getAddressBook()

    const rows = Object.keys(book).map(addr => ({
      address: {
        ...book[addr],
        value: addr
      },
      _filterKey: `${addr} ${book[addr].label || ''}`.toLowerCase()
    }))

    return (
      <Layout contentStyle={styles.layoutContent}>
        <TitleText text={t('title.addressBook')} />
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
          rows={rows}
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
        <LabelledAddress
          address={address}
          label={label}
        />
      </Button>
    )
  }

  onSelectEntry = address => {
    const { showEditAddressModal } = this.props.actions

    showEditAddressModal(address)
  }
}
