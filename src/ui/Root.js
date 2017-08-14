import React, { Component } from 'react'
import { View } from 'react-native'

import MODALS from '../utils/modals'
import { create } from './styles'
import { Navigator } from './nav'
import { connectRedux } from './helpers/decorators'
import ConnectNodeModal from './components/Modals/ConnectNode'

const MODAL_COMPONENTS = {
  [MODALS.CONNECT_NODE]: ConnectNodeModal
}

const styles = create({
  container: {
    flex: 1,
    backgroundColor: '$content_backgroundColor',
    padding: 20,
    margin: 0,
  },
})


@connectRedux()
export default class Layout extends Component {
  render () {
    return (
      <View style={styles.container}>
        <Navigator />
        {this.showModal()}
      </View>
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
