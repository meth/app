const { GENERATE_ADDRESS, LABEL_ADDRESS } = require('./api')

module.exports = {
  [GENERATE_ADDRESS]: 'createAccount',
  [LABEL_ADDRESS]: 'labelAccount'
}
