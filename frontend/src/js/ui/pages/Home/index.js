import React, { Component } from 'react'

import dispatcher from '../../../redux/dispatcher'
import { connectRedux } from '../../helpers/decorators'
import styles from './styles'

@connectRedux()
export default class Page extends Component {
  render () {
    const PageDiv = styles.pageDiv()
    return (
      <PageDiv>
        Loading...
      </PageDiv>
    )
  }

  componentDidUpdate () {
    // if (this.props.store.config.nodes) {
    //   dispatcher.nav.reset('login')
    // }
  }
}
