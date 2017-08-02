const _ = require('lodash')
const I21n = require('i21n')

const locales = {
  'en-gb': require('./lang/en-gb'),
  'zh-TW': require('./lang/zh-TW'),
}

const i21n = new I21n({}, { defaultLocale: 'en-gb' })

_.each(locales, ({ strings }, locale) => {
  i21n.loadLocale(locale, strings)
})


export const languages = _.mapValues(locales, ({ label }) => label)

export const t = (id, args) => i21n.t(id, args, { locale })
