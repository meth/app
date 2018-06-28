import React, { PureComponent } from 'react'

import styles from './styles.web'
import Button from '../../../../../components/Button'


export default class CardButton extends PureComponent {
  render () {
    const { onPress, isActive, children, propsOverride } = this.props

    return (
      <Button
        type='walletCard'
        style={isActive
          ? styles.cardButton_active
          : styles.cardButton_inactive
        }
        {...(isActive ? {
          stateOverride: { hovering: true }
        } : null)}
        onPress={onPress}
        {...propsOverride}
      >
        {children}
      </Button>
    )
  }
}
