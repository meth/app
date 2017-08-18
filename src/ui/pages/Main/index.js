import _ from 'lodash'
import React, { Component } from 'react'

import controller from '../../../redux/controller'
import { connectRedux } from '../../helpers/decorators'
import styles from './styles'

@connectRedux()
export default class Page extends Component {
  render () {
    const {
      store: {
        config: { nodes }
      }
    } = this.props

    const PageDiv = styles.pageDiv()
    const ListSelect = styles.listSelect()
    const ListOption = styles.listOption()

    const options = _.map(nodes, (group, name) => {
      const items = _.map(group, ({ name }, idx) => (
        <ListOption key={idx} value={idx}>{name}</ListOption>
      ))

      return (
        <optgroup key={name} label={name}>
          {items}
        </optgroup>
      )
    })

    return (
      <PageDiv>
        <ListSelect>
          {options}
        </ListSelect>
        <webview id="foo" src="https://www.github.com/" style="display:inline-flex; width:640px; height:480px"></webview>
      </PageDiv>
    )
  }

  componentDidMount () {
    controller.init()
      .catch(() => {})
  }
}
