import { createSelector } from 'reselect'

const _getAddresses = state => state.account.get('addresses') || {}
const _getAddressNames = state => state.account.get('addressNames') || {}

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

export const getBookMarks = state => state.account.get('bookmarks') || []

export const getDappPermissions = state => state.account.get('dappPermissions') || {}
