import React from 'react'
import PropTypes from 'prop-types'
import { View, Text } from 'react-native'

import IPC_UI_TASKS from '../../../../common/constants/ipcUiTasks'
import { t } from '../../../../common/strings'
import { globalEvents } from '../../../env'
import { CachePureComponent } from '../../helpers/components'
import IconButton from '../IconButton'
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
        <View style={styles.entryPad}>
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
      </View>
    )
  }

  _renderPin () {
    const { pin } = this.state

    return (
      <View style={styles.pin}>
        {pin.length ? (
          pin.map((number, index) => (
            <Text key={index} style={styles.pinNumber}>*</Text>
          )).concat(
            <IconButton
              key='delete'
              type='textWithBorder'
              tooltip={t('button.delete')}
              style={styles.clearButton}
              icon={{ name: 'md-backspace', style: styles.clearButtonIconText }}
              onPress={this._onPressDelete}
            />
          )
        ) : (
          /* to maintain the space we still outoupt something */
          <Text style={styles.pinNumber}> </Text>
        )}
      </View>
    )
  }

  _onPressDelete = () => {
    this.setState({ pin: [] })
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
          setTimeout(() => onPinEntered(pin.join('')), 200)
        }
      })
    }
  }

  reset () {
    this.setState({ pin: [] })
  }
}
