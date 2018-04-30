import React from 'react'
import { View, Text } from 'react-native'

import styles from './styles'
import ChainExplorerIconButton from '../../ChainExplorerIconButton'

const TransactionId = ({ tx, style, textStyle }) => {
  const { id } = tx

  return (
    <View style={[ styles.container ].concat(style)}>
      <Text style={[ styles.idText ].concat(textStyle)}>{id}</Text>
      <ChainExplorerIconButton
        linkType='transaction'
        txHash={id}
        style={styles.idLinkButton}
        textStyle={styles.idLinkButtonText}
      />
    </View>
  )
}

export default TransactionId
