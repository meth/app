import I21n from 'i21n'

const i21n = new I21n({}, { defaultLocale: 'en-gb' })

i21n.loadLocale('en-gb', require('./lang/en-gb'))

export const t = (id, args) => i21n.t(id, args, { locale })
