import _ from 'lodash'
import { PureComponent } from 'react'

import { sha256 } from '../../utils/crypto'

export class CachePureComponent extends PureComponent {
  cache = {}

  bind = (fn, ...args) => {
    const fnSig = sha256(fn.toString())

    const key = JSON.stringify({ fnSig, args })

    if (!this.cache[key]) {
      this.cache[key] = fn.bind(this, ...args)
    }

    return this.cache[key]
  }
}

export const isType = (elem, type) => _.get(elem, 'type.name') === _.get(type, 'name')
