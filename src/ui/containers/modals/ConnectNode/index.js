import _ from 'lodash'
import React, { PureComponent } from 'react'
import { Text, View } from 'react-native'

import { connectStore } from '../../../helpers/redux'
import { getNodes } from '../../../../redux/config/selectors'
import { getNodeIsConnected, getDisconnectReason, getConnectionEvent } from '../../../../redux/node/selectors'
import { t } from '../../../../../common/strings'
import { error } from '../../../../utils/stateMachines'
import ErrorBox from '../../../components/ErrorBox'
import AlertBox from '../../../components/AlertBox'
import Button from '../../../components/Button'
import Modal from '../../../components/Modal'
import Loading from '../../../components/Loading'
import Picker from '../../../components/Picker'
import styles from './styles'

@connectStore('config', 'node', 'modals')
export default class ConnectNode extends PureComponent {
  state = {}

  render () {
    const nodes = getNodes(this.props)
    const isConnected = getNodeIsConnected(this.props)
    const disconnectReason = getDisconnectReason(this.props)

    const diconnectContent = disconnectReason ? (
      <ErrorBox error={disconnectReason} />
    ) : (
      <AlertBox type="info" text={t('connector.pleaseChooseNode')} />
    )

    const content = (!nodes) ? (
      <Loading />
    ) : (
      <View>
        <Text style={styles.title}>{t('connector.connectToNetwork')}</Text>
        <View style={styles.alert}>{diconnectContent}</View>
        {this.renderSelector()}
      </View>
    )

    return (
      <Modal onOverlayPress={isConnected ? this.dismissModal : null}>
        <View style={styles.container}>{content}</View>
      </Modal>
    )
  }

  renderSelector () {
    const nodes = getNodes(this.props)
    const connectEvent = getConnectionEvent(this.props)

    let { selected } = this.state

    const options = []
    _.each(nodes, (group, category) => {
      _.each(group, ({ name }, idx) => {
        const val = `${category}.${idx}`

        // select first by default
        if (!selected) {
          selected = val
        }

        options.push({
          value: val,
          label: name,
          category
        })
      })
    })

    const errorBox =
      (error !== connectEvent.getState()) ? null : (
        <ErrorBox error={connectEvent.getData() || t('error.unexpected')} />
      )

    return (
      <View>
        <Picker
          options={options}
          selected={selected}
          onChange={this.onChange}
        />
        <Button onPress={() => this.onSubmit(selected)} title="Go" />
        {errorBox}
      </View>
    )
  }

  onChange = e => {
    this.setState({
      selected: e.target.value
    })
  }

  onSubmit = selected => {
    const nodes = getNodes(this.props)

    const node = _.get(nodes, selected)

    const { connectNode, hideConnectionModal } = this.props.actions

    connectNode(node)
      .then(() => hideConnectionModal())
      .catch(() => {})
  }

  dismissModal = () => {
    this.props.actions.hideConnectionModal()
  }
}
