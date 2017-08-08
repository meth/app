import React, { Component } from 'react'
import styled, { ThemeProvider } from 'styled-components'

import theme from './theme'
import { Navigator } from './nav'


class Layout extends Component {
  render () {
    const RootDiv = styled.div`
      display: 'block',
      height: 100vh;
      padding: 1em;
      margin: 0;
      background-color: ${props => props.theme.page.bgColor};
      color: ${props => props.theme.page.txtColor};
    `

    return (
      <RootDiv>
        <Navigator />
      </RootDiv>
    )
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
