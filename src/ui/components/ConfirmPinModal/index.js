import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Text } from 'react-native'

import Modal from '../Modal'
import PinEntry from '../PinEntry'
import styles from './styles'


export default class ConfirmPinModal extends PureComponent {
  static propTypes = {
    title: PropTypes.string.isRequired,
    onSuccess: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired
  }

  state = {
    show: false,
    pin: null
  }

  render () {
    const { show } = this.state
    const { title } = this.props

    return (!show) ? null : (
      <Modal
        onPressCloseButton={this.hide}
        overlayStyle={styles.overlay}
        contentStyle={styles.content}
      >
        <Text style={styles.text}>{title}</Text>
        <PinEntry
          style={styles.pin}
          onPinEntered={this._onPinEntered}
        />
      </Modal>
    )
  }

  _onPinEntered = pin => {
    if (this.state.pin === pin) {
      const { onSuccess } = this.props

      this.setState({ show: false, pin: null }, () => onSuccess(pin))
    }
  }

  show = pin => {
    this.setState({ show: true, pin })
  }

  hide = () => {
    const { onCancel } = this.props

    this.setState({ show: false, pin: null }, onCancel)
  }
}
