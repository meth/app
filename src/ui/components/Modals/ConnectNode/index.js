import _ from 'lodash'
import React, { PureComponent } from 'react'
import { Text, View } from 'react-native'

import { connectStore, mutable } from '../../../helpers/redux'
import controller from '../../../../redux/controller'
import { t } from '../../../../../common/strings'
import { CONNECT_NODE } from '../../../../utils/asyncEvents'
import { error } from '../../../../utils/stateMachines'
import ErrorBox from '../../ErrorBox'
import AlertBox from '../../AlertBox'
import Button from '../../Button'
import Modal from '../'
import Loading from '../../Loading'
import Picker from '../../Picker'
import styles from './styles'

@connectStore('config', 'node')
export default class ConnectNode extends PureComponent {
  state = {}

  render () {
    const { config: { nodes }, node: { disconnectReason } } = mutable(
      this.props
    )

    const diconnectContent = disconnectReason ? (
      <ErrorBox error={disconnectReason} />
    ) : (
      <AlertBox type="info" text={t('connector.pleaseChooseNode')} />
    )

    const content = !nodes ? (
      <Loading />
    ) : (
      <View>
        <Text style={styles.title}>{t('connector.connectToNetwork')}</Text>
        <View style={styles.alert}>{diconnectContent}</View>
        {this.renderSelector()}
      </View>
    )

    return (
      <Modal>
        <View style={styles.container}>{content}</View>
      </Modal>
    )
  }

  renderSelector () {
    const {
      node: { [CONNECT_NODE]: connectEvent },
      config: { nodes }
    } = mutable(this.props)

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
      error !== connectEvent.getState() ? null : (
        <ErrorBox error={connectEvent.getData() || t('error.unexpected')} />
      )

    return (
      <div>
        <Picker
          options={options}
          selected={selected}
          onChange={this.onChange}
        />
        <Button onPress={() => this.onSubmit(selected)} title="Go" />
        {errorBox}
      </div>
    )
  }

  onChange = e => {
    this.setState({
      selected: e.target.value
    })
  }

  onSubmit = selected => {
    const { config: { nodes } } = mutable(this.props)

    const node = _.get(nodes, selected)

    controller.nodes
      .connect(node)
      .then(() => controller.nodes.hideConnectionModal())
      .catch(() => {})
  }
}
