const _ = require('lodash')

_.mixin({
  deepExtend: require('underscore-deep-extend')(_),
})

module.exports = _
