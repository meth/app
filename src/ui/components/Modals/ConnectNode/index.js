import _ from 'lodash'
import React, { Component } from 'react'

import { connectRedux } from '../../../helpers/decorators'
import dispatcher from '../../../../redux/dispatcher'
// import { t } from '../../../../../../../common/strings'
// import { CONNECT_NODE } from '../../../../utils/asyncEvents'
// import { error } from '../../../../utils/stateMachines'
// import ErrorBox from '../../ErrorBox'
import Modal from '../'
import Loading from '../../Loading'
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
        config: { nodes }
      }
    } = this.props

    const ContainerView = styles.containerView()
    const TodoText = styles.todoText()

    const content = (!nodes) ? <Loading /> : <TodoText />

    return (
      <Modal>
        <ContainerView>{content}</ContainerView>
      </Modal>
    )
  }

  // renderSelector () {
  //   const {
  //     store: {
  //       node: { [CONNECT_NODE]: connectEvent },
  //       config: { nodes }
  //     }
  //   } = this.props
  //
  //   let { selected } = this.state
  //
  //   const ListSelect = styles.listSelect()
  //   const ListOption = styles.listOption()
  //
  //   const options = _.map(nodes, (group, label) => {
  //     const items = _.map(group, ({ name }, idx) => {
  //       const val = `${label}.${idx}`
  //
  //       // select first by default
  //       if (!selected) {
  //         selected = val
  //       }
  //
  //       return <ListOption key={idx} value={val}>{name}</ListOption>
  //     })
  //
  //     return (
  //       <optgroup key={label} label={label}>
  //         {items}
  //       </optgroup>
  //     )
  //   })
  //
  //   const errorBox = (error !== connectEvent.getState()) ? null : (
  //     <ErrorBox error={connectEvent.getData() || t('error.unknownConnection')} />
  //   )
  //
  //   return (
  //     <div>
  //       <ListSelect onChange={this.onChange} value={selected}>
  //         {options}
  //       </ListSelect>
  //       <button onClick={() => this.onSubmit(selected)}>Go</button>
  //       {errorBox}
  //     </div>
  //   )
  // }

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
