import React, { Component } from 'react'
import styled, { ThemeProvider } from 'styled-components'

import MODALS from '../utils/modals'
import theme from './theme'
import { Navigator } from './nav'
import { connectRedux } from './helpers/decorators'
import ConnectNodeModal from './components/Modals/ConnectNode'


const MODAL_COMPONENTS = {
  [MODALS.CONNECT_NODE]: ConnectNodeModal
}


@connectRedux()
class Layout extends Component {
  render () {
    const RootDiv = styled.div`
      display: 'block',
      padding: 1em;
      margin: 0;
      background-color: ${props => props.theme.page.bgColor};
      color: ${props => props.theme.page.txtColor};
    `

    return (
      <RootDiv>
        <Navigator />
        {this.showModal()}
      </RootDiv>
    )
  }

  showModal () {
    const {
      store: { modals }
    } = this.props

    let Component

    for (const k in modals) {
      if (modals[k]) {
        Component = MODAL_COMPONENTS[k]

        break
      }
    }

    return Component ? <Component /> : null
  }
}


export default class Root extends Component {
  render () {
    return (
      <ThemeProvider theme={theme}>
        <Layout />
      </ThemeProvider>
    )
  }
}
