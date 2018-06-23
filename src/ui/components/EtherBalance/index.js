import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Text } from 'react-native'


import TouchableView from '../TouchableView'
import styles from './styles'
import { toFormattedDecStr, toDecStr, weiToEthBigNum } from '../../../utils/number'

export default class EtherBalance extends PureComponent {
  static propTypes = {
    balance: PropTypes.object.isRequired,
    showUnits: PropTypes.bool,
    canToggle: PropTypes.bool,
    style: PropTypes.any,
    amountTextStyle: PropTypes.any,
    unitTextStyle: PropTypes.any
  }

  static defaultProps = {
    showUnits: true,
    canToggle: true
  }

  state = {
    showWei: false
  }

  render () {
    const { balance, showUnits, style, amountTextStyle, unitTextStyle } = this.props

    const { showWei } = this.state

    let amount
    if (showWei) {
      amount = toDecStr(balance)
    } else {
      amount = toFormattedDecStr(weiToEthBigNum(balance), 3)
    }

    return (
      <TouchableView style={[ styles.container, style ]} onPress={this.toggle}>
        <Text
          style={[ styles.amountText ].concat(amountTextStyle)}
          selectable={true}
        >
          {amount}
        </Text>
        {showUnits ? (
          <Text style={[ styles.unitText ].concat(unitTextStyle)}>
            {(showWei ? 'Wei' : 'Eth').toUpperCase()}
          </Text>
        ) : null}
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
