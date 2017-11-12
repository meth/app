import { createSelector } from 'reselect'

const _getAddresses = state => state.wallet.get('addresses') || {}
const _getAddressNames = state => state.wallet.get('addressNames') || {}

export const getAddresses = createSelector(
  _getAddresses,
  _getAddressNames,
  (addresses, names) => Object.keys(addresses).reduce((m, addr) => ({
    ...m,
    [addr]: {
      ...addresses[addr],
      ...(names[addr] ? { name: names[addr] } : {})
    }
  }), {})
)
