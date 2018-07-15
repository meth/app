import _ from 'lodash'
import React from 'react'

import { CachePureComponent } from '../../../helpers/components'
import { t } from '../../../../../common/strings'
import { connectStore } from '../../../helpers/redux'
import styles from './styles'
import Layout from '../Layout'
import Table from '../../../components/Table'
import Button from '../../../components/Button'
import IconButton from '../../../components/IconButton'
import LabelledAddress from '../../../components/LabelledAddress'
import Loading from '../../../components/Loading'
import TableFilterRow from '../../../components/TableFilterRow'


const RENDER_HEADER = () => null

const COLUMNS = [ { id: 'address' } ]


@connectStore('account')
export default class AddressBook extends CachePureComponent {
  static navigationOptions = {
    drawerLabel: t('title.addressBook'),
    title: t('title.addressBook')
  }

  render () {
    const { getAccounts } = this.props.selectors

    const accounts = getAccounts()

    return (
      <Layout contentStyle={styles.layoutContent} useKeyboardAvoidingScrollView={false}>
        {_.isEmpty(accounts) ? (
          <Loading style={styles.topLevelLoading} />
        ) : (
          this._renderContent()
        )}
      </Layout>
    )
  }

  _renderContent () {
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
      <Table
        style={styles.table}
        listStyle={styles.tableList}
        rowStyle={styles.tableRow}
        filterInputStyle={styles.tableFilterInput}
        renderFilter={this._renderFilter}
        filterPlaceholderText={t('addressBook.filterPlaceholder')}
        showFilter={true}
        renderHeader={RENDER_HEADER}
        renderRowData={this._renderRowData}
        columns={COLUMNS}
        rows={rows}
      />
    )
  }

  _renderFilter = defaultRenderFunc => (
    <TableFilterRow
      style={styles.tableFilterRow}
      renderFilter={defaultRenderFunc}
    >
      <IconButton
        icon={{ name: 'plus' }}
        style={styles.tableFilterButton}
        tooltip={t(`button.addAddress`)}
        onPress={this._onPressAddAddress}
      />
    </TableFilterRow>
  )

  _renderRowData = row => {
    const address = _.get(row, 'address.value')
    const label = _.get(row, 'address.label')

    return (
      <Button
        style={styles.tableRowData}
        type='tableRow'
        onPress={this.bind(this.onSelectEntry, address)}
        childShouldInheritTextStyle={true}
        childTextStylePropName='addressTextStyle'
        textStyle={styles.tableRowButtonAddressText}
      >
        <LabelledAddress address={address} label={label} />
      </Button>
    )
  }

  _onPressAddAddress = () => {
    const { showEditAddressModal } = this.props.actions

    showEditAddressModal()
  }

  onSelectEntry = address => {
    const { showEditAddressModal } = this.props.actions

    showEditAddressModal(address)
  }
}
