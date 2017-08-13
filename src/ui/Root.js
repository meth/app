import React, { Component } from 'react'
import styled, { ThemeProvider } from 'styled-components/native'

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
    const RootView = styled.View`
      padding: 1em;
      margin: 0;
      background-color: ${props => props.theme.page.bgColor};
    `

    return (
      <RootView>
        <Navigator />
        {this.showModal()}
      </RootView>
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
