import React, { PureComponent } from 'react'
import { View } from 'react-native'

import MODALS from '../utils/modals'
import logger from '../utils/log'
import { create } from './styles'
import { Navigator } from './nav'
import { connectStore, mutable } from './helpers/redux'
import ConnectNodeModal from './containers/modals/ConnectNode'
import SendTransactionModal from './containers/modals/SendTransaction'

const log = logger.create('Root')

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
export default class Root extends PureComponent {
  render () {
    return (
      <View style={styles.container}>
        <Navigator />
        {this.showModal()}
      </View>
    )
  }

  componentDidCatch (error, info) {
    log.error('UI error', error, info)
  }

  showModal () {
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
