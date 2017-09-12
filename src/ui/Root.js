import React, { PureComponent } from 'react'
import { View } from 'react-native'

import MODALS from '../utils/modals'
import { create } from './styles'
import { Navigator } from './nav'
import { connectStore, mutable } from './helpers/redux'
import ConnectNodeModal from './components/Modals/ConnectNode'
import SendTransactionModal from './components/Modals/SendTransaction'

// modals - in order of importance
const MODAL_COMPONENTS = {
  [MODALS.CONNECT_NODE]: ConnectNodeModal,
  [MODALS.SEND_TRANSACTION]: SendTransactionModal
}

const styles = create({
  container: {
    flex: 1
  }
})

@connectStore('modals')
export default class Layout extends PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <Navigator />
        {this.showModal()}
      </View>
    )
  }

  showModal() {
    const { modals } = mutable(this.props)

    const components = []

    // connect modal overrides all others
    if (modals[MODALS.CONNECT_NODE]) {
      const Component = MODAL_COMPONENTS[MODALS.CONNECT_NODE]
      components.push(<Component key={MODALS.CONNECT_NODE} />)
    } else {
      Object.keys(modals).forEach(key => {
        if (modals[key]) {
          const Component = MODAL_COMPONENTS[key]
          components.push(<Component key={key} />)
        }
      })
    }

    return components.length ? components : null
  }
}
