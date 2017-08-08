import React, { Component } from 'react'
import { ThemeProvider } from 'styled-components'

import { connectRedux } from '../../../ui/helpers/decorators'
import theme from './theme'
import styles from './styles'
import ErrorBox from '../../../ui/components/ErrorBox'

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

    return (
      <ThemeProvider theme={theme}>
        <PageDiv>
          {(!error) ? null : (
            <ErrorBox text={error} />
          )}
        </PageDiv>
      </ThemeProvider>
    )
  }
}
