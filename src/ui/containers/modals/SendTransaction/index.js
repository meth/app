import React, { PureComponent } from 'react'

import { connectStore } from '../../../helpers/redux'
import { t } from '../../../../../common/strings'
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

const indexOfTab = tabKey => TAB_ROUTES.indexOf(({ key }) => key === tabKey)


@connectStore('modals')
export default class SendTransaction extends PureComponent {
  state = {
    selectedTabIndex: indexOfTab(TAB.EDIT),
    form: null,
    rawTx: null,
    txId: null
  }

  render () {
    const { selectedTabIndex } = this.state

    return (
      <Modal
        contentStyle={styles.content}
        onPressCloseButton={this._dismissModal}
      >
        <TitleText
          style={styles.titleText}
          text={t('title.sendTransaction')}
        />
        <TabView
          routes={TAB_ROUTES}
          index={selectedTabIndex}
          onIndexChange={this._onSelectedTabIndexChange}
          getScene={this._getTabScene}
          canJumpToTab={this._canJumpToTab}
          tabBarStyle={styles.tabBar}
          tabStyle={styles.tab}
          labelTextStyle={styles.tabLabelText}
        />
      </Modal>
    )
  }

  _getTabScene = key => {
    const { form, rawTx, txId } = this.state

    switch (key) {
      case TAB.EDIT:
        return <Edit onGeneratedRawTransaction={this._onGeneratedRawTransaction} />
      case TAB.CONFIRM:
        return <Confirm form={form} rawTx={rawTx} onSentTransaction={this._onSentTransaction} />
      case TAB.DONE:
        return <Done form={form} txId={txId} />
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
    let { form, rawTx, txId } = this.state

    // if going back to editing then nullify raw tx and final id
    if (indexOfTab(TAB.EDIT) === selectedTabIndex) {
      rawTx = null
      txId = null
      form = null
    }

    this.setState({
      selectedTabIndex,
      rawTx,
      txId,
      form
    })
  }

  _onGeneratedRawTransaction = (form, rawTx) => {
    this.setState({
      form,
      rawTx,
      selectedTabIndex: indexOfTab(TAB.CONFIRM)
    })
  }

  _onSentTransaction = txId => {
    this.setState({
      txId,
      selectedTabIndex: indexOfTab(TAB.DONE)
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
