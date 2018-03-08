const { GENERATE_ADDRESS, LABEL_ADDRESS, SIGN_DATA } = require('./api')

module.exports = {
  [GENERATE_ADDRESS]: 'createAccount',
  [LABEL_ADDRESS]: 'labelAccount',
  [SIGN_DATA]: 'signData'
}
