import React, { PureComponent } from 'react'

import { t } from '../../common/strings'
import MODALS from '../../common/constants/modals'
import UI_TASKS from '../../common/constants/ipcUiTasks'
import { globalEvents } from '../env'
import { getModals } from '../redux/modals/selectors'
import { Navigator } from './nav'
import { connectStore } from './helpers/redux'
import { PopupContext } from './components/Popup'
import ConfirmPinModal from './components/ConfirmPinModal'
import LogModal from './containers/modals/Log'
import AlertModal from './containers/modals/Alert'
import ConnectNodeModal from './containers/modals/ConnectNode'
import SendTransactionModal from './containers/modals/SendTransaction'
import SignDataModal from './containers/modals/SignData'
import DappPermissionsModal from './containers/modals/DappPermissions'
import EditAddressModal from './containers/modals/EditAddress'
import EditBookmarkModal from './containers/modals/EditBookmark'
import AddressQrModal from './containers/modals/AddressQr'
import EditTokenModal from './containers/modals/EditToken'
import UpdateAvailableModal from './containers/modals/UpdateAvailable'


// modals - in order of importance
const MODAL_COMPONENTS = [
  [ MODALS.LOG, LogModal ],
  [ MODALS.ADDRESS_QR, AddressQrModal ],
  [ MODALS.SEND_TRANSACTION, SendTransactionModal ],
  [ MODALS.SIGN_DATA, SignDataModal ],
  [ MODALS.EDIT_ADDRESS, EditAddressModal ],
  [ MODALS.EDIT_BOOKMARK, EditBookmarkModal ],
  [ MODALS.EDIT_TOKEN, EditTokenModal ],
  [ MODALS.DAPP_PERMISSIONS, DappPermissionsModal ],
  [ MODALS.ALERT, AlertModal ],
  [ MODALS.CONNECT_NODE, ConnectNodeModal ],
  [ MODALS.UPDATE_AVAILABLE, UpdateAvailableModal ]
]

@connectStore('modals', 'account')
export default class Root extends PureComponent {
  componentDidMount () {
    globalEvents.on(UI_TASKS.APP_ACTIVE, this._onAppActive)
  }

  componentWillUnmount () {
    globalEvents.removeListener(UI_TASKS.APP_ACTIVE, this._onAppActive)
  }

  render () {
    return (
      <PopupContext>
        <Navigator />
        {this._renderModals()}
        <ConfirmPinModal
          ref={this._onConfirmModalRef}
          title={t('modal.confirmPin.pleaseEnterPinToContinue')}
          onSuccess={this._onPinConfirmationSuccess}
          onCancel={this._onPinConfirmationFailure}
        />
      </PopupContext>
    )
  }

  _renderModals () {
    const modals = getModals(this.props)

    const components = []

    // connect modal overrides all others
    Object.keys(modals).forEach(key => {
      if (false !== modals[key]) {
        const c = MODAL_COMPONENTS.find(([ k ]) => k === key)
        const Component = c[1]
        components.push(<Component key={key} data={modals[key]} />)
      }
    })

    return components.length ? components : null
  }

  _onConfirmModalRef = ref => {
    this.confirmPinModal = ref
  }

  _onAppActive = () => {
    const { isUserAuthenticated, getSecurityPin } = this.props.selectors

    if (isUserAuthenticated()) {
      this.confirmPinModal.show(getSecurityPin())
    }
  }

  _onPinConfirmationSuccess = () => {
    // nothing to do! UI will automatically show the right thing
  }

  _onPinConfirmationFailure = () => {
    const { closeWallet } = this.props.actions

    closeWallet()
  }
}
