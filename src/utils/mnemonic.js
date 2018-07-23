export const mnemonicToList = mnemonic => mnemonic.trim().replace(/\s+/igm, ' ').split(' ')

export const listToMnemonic = list => list.join(' ').replace(/\s+/igm, ' ').trim()

export const sanitizeMnemonic = mnemonic => listToMnemonic(mnemonicToList(mnemonic))
