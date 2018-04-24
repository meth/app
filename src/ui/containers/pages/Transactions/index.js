import _ from 'lodash'
import React from 'react'
import { View, Text } from 'react-native'

import { connectStore } from '../../../helpers/redux'
import { CachePureComponent } from '../../../helpers/components'
import { t, tSub } from '../../../../../common/strings'
import { TRANSACTION_TYPE, TRANSACTION_STATUS } from '../../../../../common/constants/protocol'
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
        {network ? this.renderContent() : <Loading />}
      </Layout>
    )
  }

  renderContent () {
    const { getTransactionHistory } = this.props.selectors
    const transactions = getTransactionHistory()

    const rows = transactions.map(({ id, params, receipt, ts }) => ({
      tx: {
        id,
        params,
        receipt,
        ts,
        value: id
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
    const { getNodeConnection } = this.props.selectors
    const { network: { txUrl } } = getNodeConnection()

    const { id, params: { from, to } } = row.tx

    const url = txUrl ? tSub(txUrl, { txHash: id }) : null

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
          {this._renderReceipt(row)}
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
        return <Icon name='dollar' style={styles.typeIcon} />
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
      case CONTRACT_CREATION:
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

  _renderReceipt (row) {
    const { getNodeConnection } = this.props.selectors
    const { network: { blockUrl, addressUrl } } = getNodeConnection()

    const status = _.get(row, 'tx.receipt.status')
    const blockNum = _.get(row, 'tx.receipt.blockNumber')
    const blockHash = _.get(row, 'tx.receipt.blockHash')
    const contractAddress = _.get(row, 'tx.receipt.contractAddress')

    const blockLink = (blockUrl && blockHash)
      ? tSub(blockUrl, { blockHash })
      : null

    const contractLink = (contractAddress && addressUrl)
      ? tSub(addressUrl, { address: contractAddress })
      : null

    let statusContent
    switch (status) {
      case TRANSACTION_STATUS.ACCEPTED: {
        statusContent = <Icon name='check' style={styles.statusAcceptedIcon} />
        break
      }
      case TRANSACTION_STATUS.REJECTED: {
        statusContent = <Icon name='close' style={styles.statusRejectedIcon} />
        break
      }
      default: {
        statusContent = <Loading />
      }
    }

    return (
      <View style={styles.txReceipt}>
        {statusContent}
        {blockNum ? (
          <View style={styles.txReceiptBlock}>
            <Text style={styles.txReceiptText}>{t('transaction.blockNum', { blockNum })}</Text>
            {blockLink ? (
              <ChainExplorerIconButton
                style={styles.receiptLinkButton}
                textStyle={styles.receiptLinkButtonText}
                onPress={this.bind(this._onPressUrl, blockLink)}
              />
            ) : null}
          </View>
        ) : null}
        {contractAddress ? (
          <View style={styles.txReceiptBlock}>
            <Text style={styles.txReceiptText}>{t('transaction.contractAddress', { contractAddress })}</Text>
            {contractLink ? (
              <ChainExplorerIconButton
                style={styles.receiptLinkButton}
                textStyle={styles.receiptLinkButtonText}
                onPress={this.bind(this._onPressUrl, contractLink)}
              />
            ) : null}
          </View>
        ) : null}
      </View>
    )
  }

  _onPressUrl = url => {
    const { openExternalUrl } = this.props.actions

    openExternalUrl(url)
  }
}
