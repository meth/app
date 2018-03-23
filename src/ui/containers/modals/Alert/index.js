import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Text } from 'react-native'

import { connectStore } from '../../../helpers/redux'
import Modal from '../../../components/Modal'
import Icon from '../../../components/Icon'
import createStyles from './styles'

@connectStore('modals')
export default class Alert extends PureComponent {
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
      <Modal
        onOverlayPress={this.onClose}
        overlayStyle={styles.overlay}
        contentStyle={styles.content}
      >
        {this.renderIcon(styles, type)}
        <Text style={styles.text}>{msg}</Text>
      </Modal>
    )
  }

  renderIcon (styles, type) {
    switch (type) {
      case 'error': {
        return <Icon name='exclamation-triangle' style={styles.icon} />
      }
      case 'info': {
        return <Icon name='info-circle' style={styles.icon} />
      }
      default: {
        return null
      }
    }
  }

  onClose = () => {
    const { actions: { hideAlert } } = this.props

    hideAlert()
  }
}
