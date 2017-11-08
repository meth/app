import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { View, Text } from 'react-native'

import { connectStore } from '../../../helpers/redux'
import Modal from '../../../components/Modal'
import createStyles from './styles'

@connectStore('modals')
export default class Log extends PureComponent {
  static propTypes = {
    data: PropTypes.shape({
      type: PropTypes.string.isRequired,
      msg: PropTypes.string.isRequired
    })
  }

  render () {
    const { data: { type, msg } } = this.props

    const styles = createStyles({ type })

    return (
      <Modal onOverlayPress={this.onClose} overlayStyle={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.text}>{msg}</Text>
        </View>
      </Modal>
    )
  }

  onClose = () => {
    const { actions: { hideAlert } } = this.props

    hideAlert()
  }
}
