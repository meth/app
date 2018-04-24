import React from 'react'
import { View, Text } from 'react-native'

import { connectStore } from '../../../helpers/redux'
import { CachePureComponent } from '../../../helpers/components'
import { t, tSub } from '../../../../../common/strings'
import { TRANSACTION_TYPE } from '../../../../../common/constants/protocol'
import { weiToEthStr } from '../../../../utils/number'
import styles from './styles'
import Layout from '../Layout'
import Loading from '../../../components/Loading'
import Icon from '../../../components/Icon'
import Table from '../../../components/Table'
import TitleText from '../../../components/TitleText'
import ChainExplorerIconButton from '../../../components/ChainExplorerIconButton'

const RENDER_NULL = () => null

const COLUMNS = [ { id: 'tx' } ]

const { CONTRACT_CALL, CONTRACT_CREATION, TOKEN_TRANSFER, ETH_TRANSFER } = TRANSACTION_TYPE

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
        {this._renderTypeIcon(row)}
        <View style={styles.txParams}>
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
          {this._renderDetails(row)}
        </View>
      </View>
    )
  }

  _renderTypeIcon (row) {
    const { params: { meta: { type } } } = row.tx

    switch (type) {
      case CONTRACT_CALL: {
        return <Icon name='md-build' style={styles.typeIcon} />
      }
      case CONTRACT_CREATION: {
        return <Icon name='md-create' style={styles.typeIcon} />
      }
      case ETH_TRANSFER: {
        return <Icon name='ethereum' style={styles.typeIcon} />
      }
      case TOKEN_TRANSFER: {
        return <Icon name='coins' style={styles.typeIcon} />
      }
      default:
        return null
    }
  }

  _renderDetails (row) {
    const { params: { value, meta } } = row.tx

    let content
    switch (meta.type) {
      case ETH_TRANSFER:
      case CONTRACT_CALL: {
        content = (
          <Text style={styles.detailsText}>
            {t('transaction.ethSent', { amount: weiToEthStr(value) })}
          </Text>
        )
        break
      }
      case TOKEN_TRANSFER: {
        const { recipient, amount, unit } = meta

        content = (
          <View style={styles.tokenTransferDetails}>
            <Text style={styles.detailsText}>{amount} {unit}</Text>
            <Icon name='long-arrow-right' style={styles.detailsText} />
            <Text style={styles.detailsText}>{recipient}</Text>
          </View>
        )
        break
      }
      default:
        content = null
    }

    return (
      <View style={styles.txDetails}>
        <Text style={styles.typeText}>{t(`transaction.type.${meta.type}`)}</Text>
        <View style={styles.detailsContent}>
          {content}
        </View>
      </View>
    )
  }

  _onPressUrl = url => {
    const { openExternalUrl } = this.props.actions

    openExternalUrl(url)
  }
}
