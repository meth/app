import React from 'react'
import PropTypes from 'prop-types'
import { View, Text } from 'react-native'

import IPC_UI_TASKS from '../../../../common/constants/ipcUiTasks'
import { globalEvents } from '../../../env'
import { CachePureComponent } from '../../helpers/components'
import Button from '../Button'
import styles from './styles'

const ROWS = [
  [ 1, 2, 3 ],
  [ 4, 5, 6 ],
  [ 7, 8, 9 ]
]

const MAX_LENGTH = 4

export default class PinEntry extends CachePureComponent {
  static propTypes = {
    style: PropTypes.any,
    onPinEntered: PropTypes.func.isRequired
  }

  state = {
    pin: []
  }

  componentDidMount () {
    globalEvents.on(IPC_UI_TASKS.KEY_NUMBER, this._onPressNumber)
    globalEvents.on(IPC_UI_TASKS.KEY_BACKSPACE, this._onPressDelete)
  }

  componentWillUnmount () {
    globalEvents.off(IPC_UI_TASKS.KEY_NUMBER, this._onPressNumber)
    globalEvents.off(IPC_UI_TASKS.KEY_BACKSPACE, this._onPressDelete)
  }

  render () {
    const { style } = this.props

    return (
      <View style={[ styles.container, style ]}>
        {this._renderPin()}
        {ROWS.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((number, nIndex) => (
              <Button
                type='pinEntry'
                key={nIndex}
                style={styles.numberButton}
                textStyle={styles.numberButtonText}
                onPress={this.bind(this._onPressNumber, number)}
                title={`${number}`}
              />
            ))}
          </View>
        ))}
      </View>
    )
  }

  _renderPin () {
    const { pin } = this.state

    const sanitized = []
    for (let i = 0; MAX_LENGTH > i; i += 1) {
      sanitized.push(pin[i] || null)
    }

    return (
      <View style={styles.pin}>
        {sanitized.map((number, index) => (
          <Text
            key={index}
            style={null !== number ? styles.pinNumber : styles.pinNumberPlaceholder}
          >
            {null !== number ? '◆' : '_'}
          </Text>
        ))}
      </View>
    )
  }

  _onPressNumber = number => {
    const { pin } = this.state

    if (MAX_LENGTH > pin.length) {
      pin.push(number)

      this.setState({
        pin: [ ...pin ]
      }, () => {
        if (MAX_LENGTH <= pin.length) {
          const { onPinEntered } = this.props

          /* minor delay for UI updates to go through */
          setTimeout(() => {
            if (!onPinEntered(pin.join(''))) {
              this.reset()
            }
          }, 200)
        }
      })
    }
  }

  _onPressDelete = () => this.reset()

  reset () {
    this.setState({ pin: [] })
  }
}
