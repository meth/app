import Mnemonic from 'bitcore-mnemonic'

module.exports = {
  generateNew: function () {
    return new Mnemonic(Mnemonic.Words.ENGLISH).toString()
  },

  loginWith: function (mnemonic) {
    // TODO: derive keys, fire actions, etc
  }
}
