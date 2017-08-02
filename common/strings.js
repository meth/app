import I21n from 'i21n'

const FALLBACK_LOCALE = 'en-gb'

const i21n = new I21n({
  initializing: {
    'en-gb': 'Initializing'
  },
}, {
  defaultLocale: FALLBACK_LOCALE
})

export const t = (id, args) => i21n.t(id, args, { locale })
