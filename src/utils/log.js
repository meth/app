import Logger from 'logarama'

import { errorEvent, warnEvent } from '../redux/log/actionCreators'

let reduxStore

export default new Logger('Meth', {
  minLevel: 'debug',
  output: (level, tag, args) => {
    args.forEach(a => {
      // eslint-disable-next-line no-console
      console[level](`${tag}[${level.toUpperCase()}]: ${a}`)
    })

    if (reduxStore) {
      let action

      switch (level) {
        case 'warn':
          warnEvent(args.join(' '), tag)
          break
        case 'error':
          errorEvent(args.join(' '), tag)
          break
        default:
          break
      }

      reduxStore.dispatch(action)
    }
  }
})

export const setStore = store => {
  reduxStore = store
}
