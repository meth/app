import I21n from 'i21n'

const FALLBACK_LOCALE = 'en-gb'

const i21n = new I21n({
  initializing: {
    'en-gb': 'Initializing'
  },
  menu: {
    application: { 'en-gb': 'Application' },
    about: { 'en-gb': 'About Meth' },
    devTools: { 'en-gb': 'Developer tools' },
    reload: { 'en-gb': 'Reload' },
    quit: { 'en-gb': 'Quit' },
    edit: { 'en-gb': 'Edit' },
    undo: { 'en-gb': 'Undo' },
    redo: { 'en-gb': 'Redo' },
    cut: { 'en-gb': 'Cut' },
    copy: { 'en-gb': 'Copy' },
    paste: { 'en-gb': 'Paste' },
    selectAll: { 'en-gb': 'Select all' },
  }
}, {
  defaultLocale: FALLBACK_LOCALE
})

export const t = (id, args) => i21n.t(id, args, { locale })
