import _ from 'lodash'
import React, { PureComponent } from 'react'
import { Text, View } from 'react-native'

import { connectStore } from '../../../helpers/redux'
import { getNodes } from '../../../../redux/config/selectors'
import { getNodeIsConnected, getDisconnectReason, getConnectionEvent } from '../../../../redux/node/selectors'
import { t } from '../../../../../common/strings'
import { error } from '../../../../utils/stateMachines'
import ErrorBox from '../../../components/ErrorBox'
import ProgressButton from '../../../components/ProgressButton'
import Modal from '../../../components/Modal'
import Loading from '../../../components/Loading'
import Picker from '../../../components/Picker'
import styles from './styles'

@connectStore('config', 'node', 'modals')
export default class ConnectNode extends PureComponent {
  state = {
    connecting: false,
    error: null
  }

  render () {
    const nodes = getNodes(this.props)
    const isConnected = getNodeIsConnected(this.props)
    const disconnectReason = getDisconnectReason(this.props)

    const diconnectContent = (!disconnectReason) ? null : (
      <ErrorBox error={disconnectReason} />
    )

    const title = (
      <Text style={styles.title}>{t('connector.pleaseChooseNode')}</Text>
    )

    const content = (!nodes) ? (
      <View style={styles.loadingContainer}>
        {title}
        <Loading />
      </View>
    ) : (
      <View style={styles.contentContainer}>
        {title}
        {this.renderSelector()}
        <View style={styles.alert}>{diconnectContent}</View>
      </View>
    )

    return (
      <Modal onOverlayPress={isConnected ? this.dismissModal : null}>
        {content}
      </Modal>
    )
  }

  renderSelector () {
    const nodes = getNodes(this.props)
    const connectEvent = getConnectionEvent(this.props)

    const { connecting } = this.state

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
        <ProgressButton
          showInProgress={connecting}
          onPress={() => this.onSubmit(selected)}
          title="Go" />
        {errorBox}
      </View>
    )
  }

  onChange = e => {
    this.setState({
      selected: e.target.value,
      error: null
    })
  }

  onSubmit = selected => {
    const nodes = getNodes(this.props)

    const node = _.get(nodes, selected)

    const { connectNode, hideConnectionModal } = this.props.actions

    this.setState({
      connecting: true,
      error: null
    }, () => {
      connectNode(node)
        .then(() => hideConnectionModal())
        .catch(err => {
          this.setState({
            error: err,
            connecting: false
          })
        })
    })
  }

  dismissModal = () => {
    this.props.actions.hideConnectionModal()
  }
}
