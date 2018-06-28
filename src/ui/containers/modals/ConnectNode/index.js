import _ from 'lodash'
import React from 'react'
import { Text, View } from 'react-native'
import { hexToNumber } from 'web3-utils'

import { connectStore } from '../../../helpers/redux'
import { CachePureComponent } from '../../../helpers/components'
import { t } from '../../../../../common/strings'
import ProgressButton from '../../../components/ProgressButton'
import AlertBox from '../../../components/AlertBox'
import TextInput from '../../../components/TextInput'
import ChainExplorerIconButton from '../../liveComponents/ChainExplorerIconButton'
import ErrorBox from '../../../components/ErrorBox'
import FormWrapper from '../../../components/FormWrapper'
import Modal from '../../../components/Modal'
import Loading from '../../../components/Loading'
import Picker from '../../../components/Picker'
import styles from './styles'

@connectStore('config', 'node')
export default class ConnectNode extends CachePureComponent {
  constructor (props) {
    super(props)

    const { getLastConnectedNode } = this.props.selectors

    const lastConnected = getLastConnectedNode()

    this.state = {
      disconnecting: false,
      connecting: false,
      error: null,
      selectedId: _.get(lastConnected, 'id', null),
      editedUrl: _.get(lastConnected, 'url', null)
    }
  }

  render () {
    const {
      getNodes,
      getNodeIsConnected
    } = this.props.selectors

    const nodes = getNodes()
    const isConnected = getNodeIsConnected()

    let content
    if (isConnected) {
      content = this.renderConnected()
    } else if (!nodes) {
      content = this.renderLoading()
    } else {
      content = this.renderForm()
    }

    return (
      <Modal
        onOverlayPress={isConnected ? this.dismissModal : null}
        contentScrollContainerStyle={styles.scrollContainerContent}
      >
        {content}
      </Modal>
    )
  }

  renderConnected () {
    const { disconnecting } = this.state

    const {
      getNodeConnection,
      getNodeState
    } = this.props.selectors

    const {
      node: { type, url },
      network: { description: network, chainId }
    } = getNodeConnection()

    const { latestBlock, syncing } = getNodeState()

    const syncPercent = (syncing) ? (
      (_.get(syncing, 'currentBlock', 0) - _.get(syncing, 'startingBlock', 0)) /
        (0.1 + (_.get(syncing, 'highestBlock', 0) - _.get(syncing, 'startingBlock', 0)))
    ) : 100

    return (
      <View style={styles.connectedInfo}>
        <Text style={styles.networkText}>{t('modal.connectNode.network', { network })}</Text>
        <Text style={styles.typeText}>{t(`modal.connectNode.url`)}: {url}</Text>
        <Text style={styles.typeText}>{t(`modal.connectNode.type`)}: {type}</Text>
        <Text style={styles.chainIdText}>{t('network.chainId')}: {chainId}</Text>
        {latestBlock ? (
          <View style={styles.block}>
            <Text style={styles.blockText}>{t('network.block')}: {hexToNumber(latestBlock.number)}</Text>
            {latestBlock ? (
              <ChainExplorerIconButton
                linkType='block'
                blockNum={hexToNumber(latestBlock.number)}
                style={styles.blockLinkButton}
                textStyle={styles.blockLinkButtonText}
              />
            ) : null}
          </View>

        ) : null}
        <Text style={styles.syncingText}>{t('network.syncing')}: {t('network.sync.percent', { percent: syncPercent })}</Text>
        <ProgressButton
          style={styles.button}
          testStyle={styles.buttonText}
          showInProgress={disconnecting}
          onPress={this.onDisconnect}
          title={t('button.disconnectFromNode')} />
        {this.renderError()}
      </View>
    )
  }

  renderLoading () {
    const title = (
      <Text style={styles.title}>{t('modal.connectNode.pleaseChooseNode')}</Text>
    )

    return (
      <View style={styles.form}>
        {title}
        <Loading />
      </View>
    )
  }

  renderForm () {
    const { connecting, editedUrl } = this.state

    const { getDisconnectReason } = this.props.selectors

    const reason = getDisconnectReason()

    const options = this.getOptions()
    const selected = options.find(o => o.selected)

    const title = (
      <Text style={styles.title}>{t('modal.connectNode.pleaseChooseNode')}</Text>
    )

    const onConnect = this.bind(this.onConnect, selected.value)

    return (
      <View style={styles.container}>
        {title}
        <FormWrapper style={styles.formWrapper}>
          <Picker
            button={{ style: styles.pickerButton }}
            options={options}
            selected={selected.value}
            onChange={this.onChange}
            renderOptionText={this._renderPickerOptionText}
          />
          {selected.canEditUrl ? (
            <TextInput
              value={editedUrl}
              style={styles.urlInput}
              placeholder={t('modal.connectNode.urlInputPlaceholder')}
              onChange={this._onChangeUrl}
              onSubmit={onConnect}
            />
          ) : null}
        </FormWrapper>
        <AlertBox
          style={styles.desc}
          type='info'
          text={t(`config.node.${selected.type}`, { network: selected.category })}
        />
        <ProgressButton
          style={styles.button}
          showInProgress={connecting}
          onPress={onConnect}
          title={t('button.connectToNode')} />
        {this.renderError(reason)}
      </View>
    )
  }

  renderError (disconnectReason) {
    const { error } = this.state

    if (!(error || disconnectReason)) {
      return null
    }

    return <ErrorBox style={styles.errorBox} error={[
      error,
      disconnectReason ? (t(`error.${disconnectReason}`) || disconnectReason) : null
    ]} />
  }

  _onChangeUrl = editedUrl => {
    this.setState({
      editedUrl: editedUrl.trim()
    })
  }

  _renderPickerOptionText = ({ label, type }) => (
    <View style={styles.pickerOption}>
      <Text style={styles.pickerOptionLabelText}>{label}</Text>
      <Text style={styles.pickerOptionCategoryText}>{type}</Text>
    </View>
  )

  getOptions () {
    const { getNodesAsFlatList } = this.props.selectors

    const nodes = getNodesAsFlatList()
    const { selectedId } = this.state

    const options = nodes.map(({ id, name, type, category, canEditUrl }) => ({
      value: id,
      label: name || category,
      type,
      category,
      selected: selectedId === id,
      canEditUrl
    }))

    // select first by default
    if (!options.find(o => !!o.selected)) {
      options[0].selected = true
    }

    return options
  }

  onChange = selectedId => {
    const { getNodesAsFlatList } = this.props.selectors

    const selectedOption = getNodesAsFlatList().find(o => o.id === selectedId)

    this.setState({
      selectedId,
      editedUrl: _.get(selectedOption, 'url', null),
      error: null
    })
  }

  onConnect = selectedId => {
    const { connectNode, hideConnectionModal } = this.props.actions
    const { editedUrl } = this.state

    if (!editedUrl) {
      return
    }

    this.setState({
      connecting: true,
      error: null
    }, () => {
      connectNode(selectedId, editedUrl)
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
    const { hideConnectionModal } = this.props.actions

    hideConnectionModal()
  }
}
