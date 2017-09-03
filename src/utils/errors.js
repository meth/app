const define = (ClassName) => {
  class A extends Error {
    constructor (...args) {
      super(...args)

      Error.captureStackTrace(this, A)
      this.name = ClassName
      this.type = ClassName
    }

    toJSON () {
      const ret = {
        name: this.name,
        message: this.message,
      }

      if (this.method) {
        ret.method = this.method
      }

      return ret
    }
  }

  A.type = ClassName

  return A
}

;[
  'InvalidParams',
  'MethodNotAllowed',
  'RequestTimeout',
  'UnableToConnect',
  'CorruptData',
  'WalletNotLoaded',
].forEach(e => {
  const n = `${e}Error`

  exports[n] = define(n)
})

export const instanceOfError = (e, ...args) => {
  for (let eK of args) {
    if (e.type === eK.type) {
      return true
    }
  }

  return false
}
