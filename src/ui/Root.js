import React, { PureComponent } from 'react'

import MODALS from '../utils/modals'
import { getModals } from '../redux/modals/selectors'
import logger from '../utils/log'
import { create } from './styles'
import { Navigator } from './nav'
import { connectStore } from './helpers/redux'
import { PopupContext } from './components/Popup'
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
      <PopupContext style={styles.container}>
        <Navigator />
        {this.showModal()}
      </PopupContext>
    )
  }

  componentDidCatch (error, info) {
    log.error('UI error', error, info)
  }

  showModal () {
    const modals = getModals(this.props)

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
