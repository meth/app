import React from 'react'
import { View, Text } from 'react-native'

import { t } from '../../../../../../common/strings'
import styles from './styles'
import Icon from '../../../../components/Icon'
import { TRANSACTION_TYPE } from '../../../../../../common/constants/protocol'
import { weiToEthStr } from '../../../../../utils/number'


const { CONTRACT_CALL, CONTRACT_CREATION, TOKEN_TRANSFER, ETH_TRANSFER } = TRANSACTION_TYPE


const TransactionDetails = ({ tx, style }) => {
  const { params: { value, meta } } = tx

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
          <Text style={styles.detailsText}>{amount || 0} {unit}</Text>
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
    <View style={[ styles.container ].concat(style)}>
      <Text style={styles.typeText}>{t(`transaction.type.${meta.type}`)}</Text>
      <View style={styles.detailsContent}>
        {content}
      </View>
    </View>
  )
}

export default TransactionDetails
