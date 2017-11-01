import _ from 'lodash'
import React, { PureComponent } from 'react'
import { Text, View } from 'react-native'

import { connectStore } from '../../../helpers/redux'
import { getNodes } from '../../../../redux/config/selectors'
import { getNodeIsConnected } from '../../../../redux/node/selectors'
import { t } from '../../../../../common/strings'
import ProgressButton from '../../../components/ProgressButton'
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

    const { selected, picker } = this.buildPicker()

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
        {picker}
        <ProgressButton
          style={styles.button}
          showInProgress={connecting}
          onPress={() => this.onSubmit(selected)}
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

  buildPicker () {
    const nodes = getNodes(this.props)
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

    return {
      selected,
      picker: (
        <Picker
          buttonStyle={styles.pickerButton}
          options={options}
          selected={selected}
          onChange={this.onChange}
        />
      )
    }
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
