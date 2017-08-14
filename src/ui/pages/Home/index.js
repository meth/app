import React, { Component } from 'react'
import { View } from 'react-native'

// import dispatcher from '../../../redux/dispatcher'
import { connectRedux } from '../../helpers/decorators'
import Loading from '../../components/Loading'
import styles from './styles'

@connectRedux()
export default class Page extends Component {
  render () {
    return (
      <View style={styles.container}>
        <Loading />
      </View>
    )
  }

  componentDidUpdate () {
    // if (this.props.store.config.nodes) {
    //   dispatcher.nav.reset('login')
    // }
  }
}
