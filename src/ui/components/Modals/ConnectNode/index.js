import _ from 'lodash'
import React, { Component } from 'react'
import { Text, View, Button } from 'react-native'

import { connectRedux } from '../../../helpers/decorators'
import dispatcher from '../../../../redux/dispatcher'
import { t } from '../../../../../common/strings'
import { CONNECT_NODE } from '../../../../utils/asyncEvents'
import { error } from '../../../../utils/stateMachines'
import ErrorBox from '../../ErrorBox'
import AlertBox from '../../AlertBox'
import Modal from '../'
import Loading from '../../Loading'
import Picker from '../../Picker'
import styles from './styles'

@connectRedux()
export default class ConnectNode extends Component {
  constructor (props, ctx) {
    super(props, ctx)

    this.state = {}
  }

  render () {
    const {
      store: {
        config: { nodes },
        node: { disconnectReason },
      },
    } = this.props

    const diconnectContent = (disconnectReason) ? (
      <ErrorBox error={disconnectReason} />
    ) : (
      <AlertBox type="info" text={t('connector.pleaseChooseNode')} />
    )

    const content = (!nodes) ? <Loading /> : (
      <View>
        <Text style={styles.title}>{t('connector.connectToNetwork')}</Text>
        <View style={styles.alert}>
          {diconnectContent}
        </View>
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
      store: {
        node: { [CONNECT_NODE]: connectEvent },
        config: { nodes }
      }
    } = this.props

    let { selected } = this.state

    const options = []
    _.each(nodes, (group, category) => {
      _.each(group, ({name}, idx) => {
        const val = `${category}.${idx}`

        // select first by default
        if (!selected) {
          selected = val
        }

        options.push({
          value: val,
          label: name,
          category,
        })
      })
    })

    const errorBox = (error !== connectEvent.getState()) ? null : (
      <ErrorBox error={connectEvent.getData() || t('error.unknownConnection')} />
    )

    return (
      <div>
        <Picker options={options} selected={selected} onChange={this.onChange} />
        <Button onPress={() => this.onSubmit(selected)} title="Go" />
        {errorBox}
      </div>
    )
  }

  onChange = (e) => {
    this.setState({
      selected: e.target.value,
    })
  }

  onSubmit = (selected) => {
    const {
      store: {
        config: { nodes }
      }
    } = this.props

    const node = _.get(nodes, selected)

    dispatcher.nodes.connect(node)
      .then(() => {
        dispatcher.nodes.hideConnectionModal()
      })
  }
}
