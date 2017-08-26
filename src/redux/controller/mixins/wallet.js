import Mnemonic from 'bitcore-mnemonic'
import { EthHdWallet } from 'eth-hd-wallet'

module.exports = {
  generateNewMnemonic: function () {
    return new Mnemonic(Mnemonic.Words.ENGLISH).toString()
  },

  openWithMnemonic: function (mnemonic) {
    this._wallet = EthHdWallet.fromMnemonic(mnemonic)
    this._wallet.generateAddresses(1)
    // TODO: fire actions, etc
  },

  getCurrent: function () {
    return this._wallet
  }
}
