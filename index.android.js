// From https://github.com/apollographql/apollo-client/issues/3236
Object.setPrototypeOf = Object.setPrototypeOf || ((obj, proto) => {
  /* eslint-disable no-proto */
  /* eslint-disable no-param-reassign */
  obj.__proto__ = proto
  /* eslint-enable no-proto */
  /* eslint-enable no-param-reassign */
  return obj
})

module.exports = require('./index.ios')
