import _ from 'lodash'

import { ALL_ADDRESSES } from '../../../common/constants/dappPermissions'
import { extractAddressPermissions } from '../../utils/dapp'
import GenericMethod from './generic'


export default class PersonalListAccounts extends GenericMethod {
  constructor (config, name = 'personal_listAccounts') {
    super(config, name)
  }

  async run (_ignore, { permissions } = {}) {
    this._log.trace('Get accounts')

    const addresses = this._walletManager.wallet().getAddresses()

    const addressPermissions = extractAddressPermissions(permissions)

    return _.get(permissions, ALL_ADDRESSES)
      ? addresses
      : addresses.filter(a => _.get(addressPermissions, a, false))
  }
}
