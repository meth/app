import _ from 'lodash'
import { PureComponent } from 'react'

export class CachePureComponent extends PureComponent {
  methodCache = {}

  cacheBind = (methodName, ...args) => {
    const key = JSON.stringify({ methodName, args })
    if (!this.methodCache[key]) {
      this.methodCache[key] = _.bind(this[methodName], this, ...args)
    }
    return this.methodCache[key]
  }
}
