import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Text } from 'react-native'

import TouchableView from '../TouchableView'
import styles from './styles'
import { toFormattedDecStr, toTokenBalanceBigNum, toDecStr } from '../../../utils/number'

export default class TokenBalance extends PureComponent {
  static propTypes = {
    balance: PropTypes.object.isRequired,
    decimals: PropTypes.number,
    canToggle: PropTypes.bool,
    style: PropTypes.any,
    textStyle: PropTypes.any
  }

  static defaultProps = {
    canToggle: true,
    decimals: 12
  }

  state = {
    showRaw: false
  }

  render () {
    const { balance, decimals, style, textStyle } = this.props

    const { showRaw } = this.state

    let amount
    if (showRaw) {
      amount = toDecStr(balance)
    } else {
      amount = toFormattedDecStr(toTokenBalanceBigNum(balance, decimals), 18)
    }

    return (
      <TouchableView style={style} onPress={this.toggle}>
        <Text
          style={[ styles.text ].concat(textStyle)}
          selectable={true}
        >
          {amount}
        </Text>
      </TouchableView>
    )
  }

  toggle = () => {
    const { canToggle } = this.props

    const { showRaw } = this.state

    if (canToggle) {
      this.setState({ showRaw: !showRaw })
    }
  }
}
