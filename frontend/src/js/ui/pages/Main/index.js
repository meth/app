import _ from 'lodash'
import React, { Component } from 'react'
import { ThemeProvider } from 'styled-components'

import dispatcher from '../../../data/dispatcher'
import { connectRedux } from '../../helpers/decorators'
import theme from './theme'
import styles from './styles'
import ErrorBox from '../../components/ErrorBox'

@connectRedux()
export default class Page extends Component {
  render () {
    const {
      store: {
        app: {
          error, nodes
        }
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
      <ThemeProvider theme={theme}>
        <PageDiv>
          {(!error) ? null : (
            <ErrorBox text={error} />
          )}
          <ListSelect>
            {options}
          </ListSelect>
        </PageDiv>
      </ThemeProvider>
    )
  }

  componentDidMount () {
    dispatcher.init()
  }
}
