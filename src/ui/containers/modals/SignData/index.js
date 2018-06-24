import React, { PureComponent } from 'react'

import { connectStore } from '../../../helpers/redux'
import { t } from '../../../../../common/strings'
import { ETH, DEFAULT_GAS_LIMIT } from '../../../../../common/constants/protocol'
import Modal from '../../../components/Modal'
import Edit from './Edit'
import Confirm from './Confirm'
import Done from './Done'

import TitleText from '../../../components/TitleText'
import TabView from '../../../components/TabView'
import styles from './styles'

const TAB = {
  EDIT: 'EDIT',
  CONFIRM: 'CONFIRM',
  DONE: 'DONE'
}

const TAB_ROUTES = [
  { key: TAB.EDIT, title: t('modal.sendTransaction.tab.edit') },
  { key: TAB.CONFIRM, title: t('modal.sendTransaction.tab.confirm') },
  { key: TAB.DONE, title: t('modal.sendTransaction.tab.done') }
]

const indexOfTab = tabKey => TAB_ROUTES.findIndex(({ key }) => key === tabKey)


@connectStore('account')
export default class SendTransaction extends PureComponent {
  constructor (props, ctx) {
    super(props, ctx)

    const { getTx, getLastGasPrice } = props.selectors
    const { from, to, value, gas: gasLimit, data } = getTx()

    this.state = {
      params: {
        from,
        to,
        amount: value,
        data,
        unit: ETH,
        gasLimit: `${gasLimit || DEFAULT_GAS_LIMIT}`,
        gasPrice: `${getLastGasPrice()}`,
        isContractCreation: (!to && !!data)
      },
      rawTx: null,
      txId: null
    }
  }

  render () {
    return (
      <Modal
        contentStyle={styles.content}
        contentScrollContainerStyle={styles.scrollContainerContent}
        onPressCloseButton={this._dismissModal}
      >
        <TitleText
          style={styles.titleText}
          text={t('title.sendTransaction')}
        />
        <TabView
          ref={this._onTabViewRef}
          key='sendTransaction'
          routes={TAB_ROUTES}
          initialIndex={indexOfTab(TAB.EDIT)}
          onIndexChange={this._onSelectedTabIndexChange}
          getScene={this._getTabScene}
          canJumpToTab={this._canJumpToTab}
        />
      </Modal>
    )
  }

  _onTabViewRef = ref => {
    this.tabView = ref
  }

  _getTabScene = key => {
    const { params, rawTx, txId } = this.state

    switch (key) {
      case TAB.EDIT:
        return <Edit params={params} onGeneratedRawTransaction={this._onGeneratedRawTransaction} />
      case TAB.CONFIRM:
        return <Confirm params={params} rawTx={rawTx} onSentTransaction={this._onSentTransaction} />
      case TAB.DONE:
        return <Done txId={txId} />
      default:
        return null
    }
  }

  _canJumpToTab = key => {
    const { rawTx, txId } = this.state

    switch (key) {
      case TAB.EDIT:
        return !txId
      case TAB.CONFIRM:
        return (!txId) && !!rawTx
      case TAB.DONE:
        return !!txId
      default:
        return true
    }
  }

  _onSelectedTabIndexChange = selectedTabIndex => {
    // if going back to editing then nullify raw tx and final id
    if (indexOfTab(TAB.EDIT) === selectedTabIndex) {
      this.setState({
        rawTx: null,
        txId: null
      })
    }
  }

  _onGeneratedRawTransaction = (params, rawTx) => {
    if (!params.amount) {
      params.amount = 0 // eslint-disable-line no-param-reassign
    }

    this.setState({ params, rawTx }, () => {
      this.tabView.jumpTo(TAB.CONFIRM)
    })
  }

  _onSentTransaction = txId => {
    this.setState({ txId }, () => {
      this.tabView.jumpTo(TAB.DONE)
    })
  }

  _dismissModal = () => {
    const { txId } = this.state
    const { cancelTransaction, hideSendTransactionModal } = this.props.actions

    // only cancel tx if not already succeeded
    if (!txId) {
      cancelTransaction(t('error.userCancelledTransaction'))
    } else {
      hideSendTransactionModal()
    }
  }
}
