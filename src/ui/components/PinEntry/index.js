import React from 'react'
import PropTypes from 'prop-types'
import { View, Text } from 'react-native'

import { t } from '../../../../common/strings'
import { CachePureComponent } from '../../helpers/components'
import IconButton from '../IconButton'
import TouchableView from '../TouchableView'
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

  render () {
    const { style } = this.props

    return (
      <View style={[ styles.container, style ]}>
        {this._renderPin()}
        {ROWS.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((number, nIndex) => (
              <TouchableView
                key={nIndex}
                style={styles.number}
                onPress={this.bind(this._onPressNumber, number)}
              >
                <Text style={styles.numberText}>{number}</Text>
              </TouchableView>
            ))}
          </View>
        ))}
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
    const { pin } = this.state

    pin.pop()

    this.setState({ pin: [ ...pin ] })
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
