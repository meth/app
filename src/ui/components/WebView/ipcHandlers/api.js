import { DAPP_PERMISSIONS, API_COMMAND } from '../../../../../common/constants'
import Wallet from '../../../../wallet'


const _ensurePermission = (haystack, needle) => {
  if (!haystack.includes(needle)) {
    throw new Error(`Webview does not have permission to execute command: ${needle}`)
  }
}


export default ({ command }, permissions) => {
  switch (command) {
    case API_COMMAND.CREATE_ACCOUNT:
      _ensurePermission(permissions, DAPP_PERMISSIONS.CREATE_ACCOUNT)

      return Wallet.generateAccount()
    default:
      return new Error('Unrecognized API command')
  }
}
