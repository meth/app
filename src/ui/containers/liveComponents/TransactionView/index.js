import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'

import { TRANSACTION_TYPE } from '../../../../../common/constants/protocol'
import styles from './styles'
import Icon from '../../../components/Icon'
import TransactionReceipt from './TransactionReceipt'
import TransactionFromTo from './TransactionFromTo'
import TransactionId from './TransactionId'
import TransactionDetails from './TransactionDetails'


const { CONTRACT_CALL, CONTRACT_CREATION, TOKEN_TRANSFER, ETH_TRANSFER } = TRANSACTION_TYPE


export default class TransactionView extends PureComponent {
  static propTypes = {
    tx: PropTypes.object,
    style: PropTypes.any
  }

  render () {
    const { tx, style } = this.props

    return (
      <View style={[ styles.container ].concat(style)}>
        {this._renderTypeIcon(tx)}
        <View style={styles.txParams}>
          <TransactionId tx={tx} style={styles.txId} />
          <TransactionFromTo tx={tx} style={styles.txFromTo} />
          <TransactionDetails tx={tx} style={styles.txDetails} />
          <TransactionReceipt tx={tx} style={styles.txReceipt} />
        </View>
      </View>
    )
  }

  _renderTypeIcon (tx) {
    const { params: { meta: { type } } } = tx

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
}
