import React, { PureComponent } from 'react'

import MODALS from '../../common/constants/modals'
import { getModals } from '../redux/modals/selectors'
import { Navigator } from './nav'
import { connectStore } from './helpers/redux'
import { PopupContext } from './components/Popup'
import LogModal from './containers/modals/Log'
import AlertModal from './containers/modals/Alert'
import ConnectNodeModal from './containers/modals/ConnectNode'
import SendTransactionModal from './containers/modals/SendTransaction'
import DappPermissionsModal from './containers/modals/DappPermissions'
import EditAddressModal from './containers/modals/EditAddress'
import AddressQrModal from './containers/modals/AddressQr'
import EditTokenModal from './containers/modals/EditToken'
import AddAccountModal from './containers/modals/AddAccount'

// modals - in order of importance
const MODAL_COMPONENTS = {
  [MODALS.LOG]: LogModal,
  [MODALS.ALERT]: AlertModal,
  [MODALS.CONNECT_NODE]: ConnectNodeModal,
  [MODALS.SEND_TRANSACTION]: SendTransactionModal,
  [MODALS.DAPP_PERMISSIONS]: DappPermissionsModal,
  [MODALS.EDIT_ADDRESS]: EditAddressModal,
  [MODALS.ADDRESS_QR]: AddressQrModal,
  [MODALS.EDIT_TOKEN]: EditTokenModal,
  [MODALS.ADD_ACCOUNT]: AddAccountModal
}

@connectStore('modals')
export default class Root extends PureComponent {
  render () {
    return (
      <PopupContext>
        <Navigator />
        {this.renderModals()}
      </PopupContext>
    )
  }

  renderModals () {
    const modals = getModals(this.props)

    const components = []

    // connect modal overrides all others
    if (modals[MODALS.CONNECT_NODE]) {
      const Component = MODAL_COMPONENTS[MODALS.CONNECT_NODE]
      components.push(<Component key={MODALS.CONNECT_NODE} />)
    } else {
      Object.keys(modals).forEach(key => {
        if (false !== modals[key]) {
          const Component = MODAL_COMPONENTS[key]
          components.push(<Component key={key} data={modals[key]} />)
        }
      })
    }

    return components.length ? components : null
  }
}
