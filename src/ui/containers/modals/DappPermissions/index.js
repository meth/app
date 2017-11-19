import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { View, Text } from 'react-native'

import { connectStore } from '../../../helpers/redux'
import { getDappPermissions } from '../../../../redux/account/selectors'
import Modal from '../../../components/Modal'
import styles from './styles'

@connectStore('modals', 'account')
export default class DappPermissions extends PureComponent {
  static propTypes = {
    data: PropTypes.shape({
      dappId: PropTypes.string.isRequired
    })
  }

  state = {
    permissions: null
  }

  componentWillReceiveProps (newProps) {
    const { data: { dappId } } = this.props
    const { data: { newDappId } } = newProps

    if (newDappId !== dappId) {
      this.setState({
        permissions: null
      })
    }
  }

  render () {
    const { data: { dappId } } = this.props
    const { [dappId]: savedPermissions } = getDappPermissions(this.props)
    const { permissions: newPermissions } = this.state

    const permissions = newPermissions || savedPermissions

    return (
      <Modal
        contentStyle={styles.content}
        onPressCloseButton={this.close}
      >
        <View style={styles.dappTitle}>
          <Text style={styles.dappTitlePrefixText}>DAPP:</Text>
          <Text style={styles.dappTitleIdText}>{dappId}</Text>
        </View>
        {this.renderForm(permissions)}
      </Modal>
    )
  }

  renderForm () {
    return null
  }

  close = () => {
    const { actions: { hideDappPermissionsModal } } = this.props

    hideDappPermissionsModal()
  }
}
