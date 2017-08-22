import React, { PureComponent } from 'react'
import { View } from 'react-native'

import MODALS from '../utils/modals'
import { create } from './styles'
import { Navigator } from './nav'
import { connectStore, mutable } from './helpers/redux'
import ConnectNodeModal from './components/Modals/ConnectNode'


const MODAL_COMPONENTS = {
  [MODALS.CONNECT_NODE]: ConnectNodeModal
}


const styles = create({
  container: {
    flex: 1,
  },
})


@connectStore('modals')
export default class Layout extends PureComponent {
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
      modals
    } = mutable(this.props)

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
