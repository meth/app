const _ = require('lodash')
const I21n = require('i21n')

const locales = {
  /* eslint-disable global-require */
  'en-gb': require('./lang/en-gb'),
  'zh-TW': require('./lang/zh-TW')
  /* eslint-enable global-require */
}

const i21n = new I21n({}, { defaultLocale: 'en-gb' })

_.each(locales, (data, locale) => {
  i21n.loadLocale(locale, data.strings)
})

exports.languages = _.mapValues(locales, data => data.label)

exports.t = (id, args) => i21n.t(id, args)
