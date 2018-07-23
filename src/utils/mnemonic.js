export const mnemonicToList = mnemonic =>
  mnemonic.trim().replace(/\s+/gim, ' ').split(' ')

export const listToMnemonic = list =>
  list.join(' ').replace(/\s+/gim, ' ').trim()

export const sanitizeMnemonic = mnemonic =>
  listToMnemonic(mnemonicToList(mnemonic))
