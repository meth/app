import _ from 'lodash'
import React, { PureComponent } from 'react'
import { Text, View } from 'react-native'

import { connectStore } from '../../../helpers/redux'
import { getNodes } from '../../../../redux/config/selectors'
import { getNodeConnection, getNodeIsConnected } from '../../../../redux/node/selectors'
import { t } from '../../../../../common/strings'
import ProgressButton from '../../../components/ProgressButton'
import AlertBox from '../../../components/AlertBox'
import ErrorBox from '../../../components/ErrorBox'
import Modal from '../../../components/Modal'
import Loading from '../../../components/Loading'
import Picker from '../../../components/Picker'
import styles from './styles'

@connectStore('config', 'node', 'modals')
export default class ConnectNode extends PureComponent {
  state = {
    disconnecting: false,
    connecting: false,
    error: null
  }

  render () {
    const nodes = getNodes(this.props)
    const isConnected = getNodeIsConnected(this.props)

    let content
    if (isConnected) {
      content = this.renderConnected()
    } else if (!nodes) {
      content = this.renderLoading()
    } else {
      content = this.renderForm()
    }

    return (
      <Modal onOverlayPress={isConnected ? this.dismissModal : null}>
        {content}
      </Modal>
    )
  }

  renderConnected () {
    const { disconnecting } = this.state

    const {
      node: { name, url },
      network: { description: network, chainId }
    } = getNodeConnection(this.props)

    return (
      <View style={styles.container}>
        <Text style={styles.nameText}>{name}</Text>
        <Text style={styles.urlText}>{url}</Text>
        <Text style={styles.networkText}>{t('connector.network', { network })}</Text>
        <Text style={styles.chainIdText}>chainId: {chainId}</Text>
        <ProgressButton
          style={styles.button}
          showInProgress={disconnecting}
          onPress={() => this.onDisconnect()}
          title={t('button.disconnectFromNode')} />
        {this.renderError()}
      </View>
    )
  }

  renderLoading () {
    const title = (
      <Text style={styles.title}>{t('connector.pleaseChooseNode')}</Text>
    )

    return (
      <View style={styles.container}>
        {title}
        <Loading />
      </View>
    )
  }

  renderForm () {
    const { connecting } = this.state

    const options = this.getOptions()
    const selected = options.find(o => o.selected)


    const title = (
      <Text style={styles.title}>{t('connector.pleaseChooseNode')}</Text>
    )

    return (
      <View style={styles.container}>
        {title}
        <Picker
          style={styles.picker}
          buttonStyle={styles.pickerButton}
          options={options}
          selected={selected.value}
          onChange={this.onChange}
        />
        <AlertBox
          style={styles.desc}
          type='info'
          text={t(`config.node.${selected.host}.${selected.network}`)}
        >
        </AlertBox>
        <ProgressButton
          style={styles.button}
          showInProgress={connecting}
          onPress={() => this.onConnect(selected.value)}
          title={t('button.connectToNode')} />
        {this.renderError()}
      </View>
    )
  }

  renderError () {
    const { error } = this.state

    return (!error) ? null : (
      <ErrorBox style={styles.errorBox} error={error} />
    )
  }

  getOptions () {
    const nodes = getNodes(this.props)
    let { selected } = this.state

    const options = []

    _.each(nodes, ({ network, connections }, category) => {
      _.each(connections, ({ name, host }, idx) => {
        const val = `${category}.connections.${idx}`

        // select first by default
        if (!selected) {
          selected = val
        }

        options.push({
          value: val,
          label: name,
          category,
          network,
          host,
          selected: selected === val
        })
      })
    })

    return options
  }

  onChange = selected => {
    this.setState({
      selected,
      error: null
    })
  }

  onConnect = selected => {
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

  onDisconnect = () => {
    const { disconnectNode } = this.props.actions

    this.setState({
      disconnecting: true,
      error: null
    }, () => {
      disconnectNode()
        .then(() => {
          this.setState({
            disconnecting: false
          })
        })
        .catch(err => {
          this.setState({
            error: err,
            disconnecting: false
          })
        })
    })
  }

  dismissModal = () => {
    this.props.actions.hideConnectionModal()
  }
}
