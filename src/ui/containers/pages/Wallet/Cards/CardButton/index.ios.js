import React, { PureComponent } from 'react'

import styles from './styles.ios'
import Button from '../../../../../components/Button'


export default class CardButton extends PureComponent {
  render () {
    const { onPress, children, propsOverride } = this.props

    return (
      <Button
        type='walletCard'
        style={styles.cardButton}
        stateOverride={{ hovering: true }}
        onPress={onPress}
        {...propsOverride}
      >
        {children}
      </Button>
    )
  }
}
