const _ = require('lodash')
const deepExtend = require('underscore-deep-extend')

_.mixin({
  deepExtend: deepExtend(_)
})

module.exports = _
