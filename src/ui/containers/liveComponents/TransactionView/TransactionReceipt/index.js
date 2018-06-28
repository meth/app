import _ from 'lodash'
import React from 'react'
import { View, Text } from 'react-native'

import { t } from '../../../../../../common/strings'
import ADDRESS_TYPES from '../../../../../../common/constants/addressTypes'
import { TRANSACTION_STATUS } from '../../../../../../common/constants/protocol'
import styles from './styles'
import Loading from '../../../../components/Loading'
import Icon from '../../../../components/Icon'
import ChainExplorerIconButton from '../../ChainExplorerIconButton'
import AddressText from '../../AddressText'


const TransactionReceipt = ({ tx, style }) => {
  const status = _.get(tx, 'receipt.status')
  const blockNum = _.get(tx, 'receipt.blockNumber')
  const contractAddress = _.get(tx, 'receipt.contractAddress')

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
    <View style={[ styles.container ].concat(style)}>
      {statusContent}
      {blockNum ? (
        <View style={styles.blockNumBlock}>
          <Text style={styles.blockNumText}>{t('transaction.blockNum', { blockNum })}</Text>
          <ChainExplorerIconButton
            linkType='block'
            blockNum={blockNum}
            style={styles.receiptLinkButton}
            textStyle={styles.receiptLinkButtonText}
          />
        </View>
      ) : null}
      {contractAddress ? (
        <View style={styles.receiptBlock}>
          <Text style={styles.addressPrefixText}>
            {t('transaction.contractLabel')}:
          </Text>
          <AddressText
            style={styles.addressTextContainer}
            textStyle={styles.addressText}
            text={contractAddress}
            address={contractAddress}
            addressType={ADDRESS_TYPES.CONTRACT}
          />
        </View>
      ) : null}
    </View>
  )
}

export default TransactionReceipt
