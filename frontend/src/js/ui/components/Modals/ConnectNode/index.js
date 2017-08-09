import _ from 'lodash'
import React, { Component } from 'react'

import { connectRedux } from '../../../helpers/decorators'
import Modal from '../'
import Loading from '../../Loading'
import styles from './styles'

@connectRedux()
export default class ConnectNode extends Component {
  constructor (props, ctx) {
    super(props, ctx)

    this.state = {}

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  render () {
    const {
      store: {
        config: { nodes }
      }
    } = this.props

    const ContainerDiv = styles.containerDiv()

    const content = (!nodes) ? <Loading /> : this.renderSelector()

    return (
      <Modal>
        <ContainerDiv>{content}</ContainerDiv>
      </Modal>
    )
  }

  renderSelector () {
    const {
      store: {
        config: { nodes }
      }
    } = this.props

    let { selected } = this.state

    const ListSelect = styles.listSelect()
    const ListOption = styles.listOption()

    const options = _.map(nodes, (group, label) => {
      const items = _.map(group, ({ name }, idx) => {
        const val = `${label}|${idx}`

        // select first by default
        if (!selected) {
          selected = val
        }

        return <ListOption key={idx} value={val}>{name}</ListOption>
      })

      return (
        <optgroup key={label} label={label}>
          {items}
        </optgroup>
      )
    })

    return (
      <div>
        <ListSelect onChange={this.onChange} value={selected}>
          {options}
        </ListSelect>
        <button onClick={() => this.onSubmit(selected)}>Go</button>
      </div>
    )
  }

  onChange (e) {
    this.setState({
      selected: e.target.value,
    })
  }

  onSubmit (selected) {
    const {
      store: {
        config: { nodes }
      }
    } = this.props

    const [ group, idx ] = selected.split('|')

    console.log(nodes[group][idx])
  }
}
