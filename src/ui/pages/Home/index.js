import React, { Component } from 'react'

// import dispatcher from '../../../redux/dispatcher'
import { connectRedux } from '../../helpers/decorators'
import Loading from '../../components/Loading'
import styles from './styles'

@connectRedux()
export default class Page extends Component {
  render () {
    const PageView = styles.pageView()

    return (
      <PageView>
        <Loading />
      </PageView>
    )
  }

  componentDidUpdate () {
    // if (this.props.store.config.nodes) {
    //   dispatcher.nav.reset('login')
    // }
  }
}
