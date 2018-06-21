import React from 'react'
import { View } from 'react-native'

import styles from './styles'
import CopyableText from '../../../../components/CopyableText'
import ChainExplorerIconButton from '../../ChainExplorerIconButton'

const TransactionId = ({ tx, style, textStyle }) => {
  const { id } = tx

  return (
    <View style={[ styles.container ].concat(style)}>
      <CopyableText
        style={styles.idTextContainer}
        textStyle={[ styles.idText ].concat(textStyle)}
        text={id}
       />
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
