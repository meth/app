import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Text, View } from 'react-native'

import Modal from '../Modal'
import Button from '../Button'
import styles from './styles'


export default class AskUserConfirmModal extends PureComponent {
  static propTypes = {
    question: PropTypes.string.isRequired,
    yesButtonText: PropTypes.string.isRequired,
    noButtonText: PropTypes.string.isRequired,
    onPressYes: PropTypes.func,
    onPressNo: PropTypes.func
  }

  state = {
    show: false
  }

  render () {
    const { show } = this.state

    const {
      question,
      yesButtonText,
      noButtonText
    } = this.props

    return (!show) ? null : (
      <Modal
        onClose={this.hide}
        onOverlayPress={this.hide}
        overlayStyle={styles.overlay}
        contentStyle={styles.content}
      >
        <Text style={styles.text}>
          {question}
        </Text>
        <View style={styles.buttons}>
          <Button
            style={styles.button}
            title={yesButtonText}
            onPress={this.onPressYes}
          />
          <Button
            style={styles.button}
            title={noButtonText}
            onPress={this.onPressNo}
          />
        </View>
      </Modal>
    )
  }

  show = () => {
    this.setState({ show: true })
  }

  hide = () => {
    this.setState({ show: false })
  }

  onPressNo = () => {
    const { onPressNo } = this.props

    this.setState({ show: false }, () => onPressNo && onPressNo())
  }

  onPressYes = () => {
    const { onPressYes } = this.props

    this.setState({ show: false }, () => onPressYes && onPressYes())
  }
}
