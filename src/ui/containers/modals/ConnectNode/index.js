import _ from 'lodash'
import React, { PureComponent } from 'react'
import { Text, View } from 'react-native'

import { connectStore } from '../../../helpers/redux'
import { getNodes } from '../../../../redux/config/selectors'
import { getNodeIsConnected } from '../../../../redux/node/selectors'
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
    connecting: false,
    error: null
  }

  render () {
    const { error, connecting } = this.state
    const nodes = getNodes(this.props)
    const isConnected = getNodeIsConnected(this.props)

    const title = (
      <Text style={styles.title}>{t('connector.pleaseChooseNode')}</Text>
    )

    const options = this.getOptions()
    const selected = options.find(o => o.selected)

    const errorBox = (!error) ? null : (
      <ErrorBox style={styles.errorBox} error={error} />
    )

    const content = (!nodes) ? (
      <View style={styles.container}>
        {title}
        <Loading />
      </View>
    ) : (
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
          onPress={() => this.onSubmit(selected.value)}
          title={t('button.connectToNode')} />
        {errorBox}
      </View>
    )

    return (
      <Modal onOverlayPress={isConnected ? this.dismissModal : null}>
        {content}
      </Modal>
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
