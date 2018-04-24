import React from 'react'
import { View, Text } from 'react-native'

import { connectStore } from '../../../helpers/redux'
import { CachePureComponent } from '../../../helpers/components'
import { t, tSub } from '../../../../../common/strings'
import styles from './styles'
import Layout from '../Layout'
import Loading from '../../../components/Loading'
import Icon from '../../../components/Icon'
import Table from '../../../components/Table'
import TitleText from '../../../components/TitleText'
import ChainExplorerIconButton from '../../../components/ChainExplorerIconButton'

const RENDER_NULL = () => null

const COLUMNS = [ { id: 'tx' } ]

@connectStore('nav', 'account')
export default class Transactions extends CachePureComponent {
  render () {
    const { getNodeConnection } = this.props.selectors

    const { network } = (getNodeConnection() || {})

    return (
      <Layout contentStyle={styles.layoutContent}>
        <TitleText text={t('title.transactions')} />
        {network ? this.renderContent(network) : <Loading />}
      </Layout>
    )
  }

  renderContent ({ txUrl }) {
    const { getTransactionHistory } = this.props.selectors
    const transactions = getTransactionHistory()

    const rows = transactions.map(({ id, params, ts }) => ({
      tx: {
        id,
        params,
        ts,
        value: id,
        url: txUrl ? tSub(txUrl, id) : null
      }
    }))

    return (
      <Table
        style={styles.table}
        listStyle={styles.tableList}
        rowStyle={styles.tableRow}
        renderFilter={RENDER_NULL}
        renderHeader={RENDER_NULL}
        renderRowData={this._renderRowData}
        columns={COLUMNS}
        rows={rows}
      />
    )
  }

  _renderRowData = row => {
    const {
      id,
      params: { from, to },
      url
    } = row.tx

    return (
      <View style={styles.tx}>
        <View style={styles.txInfo}>
          <View style={styles.id}>
            <Text style={styles.idText}>{id}</Text>
            {url ? (
              <ChainExplorerIconButton
                style={styles.idLinkButton}
                textStyle={styles.idLinkButtonText}
                onPress={this.bind(this._onPressUrl, url)}
              />
            ) : null}
          </View>
          <View style={styles.txFromTo}>
            <Text style={styles.fromToText}>{from}</Text>
            <Icon name='long-arrow-right' style={styles.fromToText} />
            <Text style={styles.fromToText}>{to || t('')}</Text>
          </View>
        </View>
        <View style={styles.txMeta}>
        </View>
      </View>
    )
  }

  _onPressUrl = url => {
    const { openExternalUrl } = this.props.actions

    openExternalUrl(url)
  }
}
