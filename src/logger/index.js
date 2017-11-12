import Logger from 'logarama'

let store

export default new Logger('Meth', {
  minLevel: 'debug',
  output: (level, tag, args) => {
    args.forEach(a => {
      // eslint-disable-next-line no-console
      console[level](`${tag}[${level.toUpperCase()}]: ${a}`)
    })

    if (store) {
      const { infoEvent, warnEvent, errorEvent } = store.actions

      switch (level) {
        case 'info':
          infoEvent(args.join('\n'), tag)
          break
        case 'warn':
          warnEvent(args.join('\n'), tag)
          break
        case 'error':
          errorEvent(args.join('\n'), tag)
          break
        default:
          break
      }
    }
  }
})

export const setStore = reduxStore => {
  store = reduxStore
}
