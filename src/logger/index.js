import Logger from 'logarama'

import { errorEvent, warnEvent, infoEvent } from '../redux/log/actionCreators'

let store

export default new Logger('Meth', {
  minLevel: 'debug',
  output: (level, tag, args) => {
    args.forEach(a => {
      // eslint-disable-next-line no-console
      console[level](`${tag}[${level.toUpperCase()}]: ${a}`)
    })

    if (store) {
      let action

      switch (level) {
        case 'info':
          action = infoEvent(args.join('\n'), tag)
          break
        case 'warn':
          action = warnEvent(args.join('\n'), tag)
          break
        case 'error':
          action = errorEvent(args.join('\n'), tag)
          break
        default:
          break
      }

      if (action) {
        store.dispatch(action)
      }
    }
  }
})

export const setStore = reduxStore => {
  store = reduxStore
}
