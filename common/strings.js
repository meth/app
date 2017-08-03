const _ = require('lodash')
const I21n = require('i21n')

const locales = {
  'en-gb': require('./lang/en-gb'),
  'zh-TW': require('./lang/zh-TW'),
}

const i21n = new I21n({}, { defaultLocale: 'en-gb' })

_.each(locales, (data, locale) => {
  i21n.loadLocale(locale, data.strings)
})

exports.languages = _.mapValues(locales, data => data.label)

exports.t = (id, args) => i21n.t(id, args)
