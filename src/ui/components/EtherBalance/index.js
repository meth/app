import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Text } from 'react-native'
import { fromWei } from 'web3-utils'

import TouchableView from '../TouchableView'
import styles from './styles'

export default class EtherBalance extends PureComponent {
  static propTypes = {
    balance: PropTypes.object.isRequired,
    canToggle: PropTypes.bool,
    style: PropTypes.any,
    amountTextStyle: PropTypes.any,
    unitTextStyle: PropTypes.any
  }

  state = {
    showWei: false,
    canToggle: true
  }

  render () {
    const { balance, style, amountTextStyle, unitTextStyle } = this.props

    const { showWei } = this.state

    let amount
    if (showWei) {
      amount = balance.toString(10)
    } else {
      amount = fromWei(balance, 'ether')
    }

    return (
      <TouchableView style={[ styles.container, style ]} onPress={this.toggle}>
        <Text
          style={[ styles.amountText ].concat(amountTextStyle)}
          selectable={true}
        >
          {amount}
        </Text>
        <Text style={[ styles.unitText ].concat(unitTextStyle)}>
          {showWei ? 'Wei' : 'Eth'}
        </Text>
      </TouchableView>
    )
  }

  toggle = () => {
    const { canToggle } = this.props

    const { showWei } = this.state

    if (canToggle) {
      this.setState({ showWei: !showWei })
    }
  }
}
