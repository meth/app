import _ from 'lodash'

import { ALL_ADDRESSES } from '../../../common/constants/dappPermissions'
import { extractAddressPermissions } from '../../utils/dapp'
import GenericMethod from './generic'


export default class EthGetAccounts extends GenericMethod {
  constructor (config) {
    super(config, 'eth_accounts')
  }

  async run (_ignore, { fullAccess, permissions } = {}) {
    this._log.trace('Get accounts')

    const addresses = this._walletManager.wallet().getAddresses()

    const addressPermissions = extractAddressPermissions(permissions)

    return (fullAccess || _.get(permissions, ALL_ADDRESSES))
      ? addresses
      : addresses.filter(a => _.get(addressPermissions, a, false))
  }
}
