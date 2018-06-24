const define = ClassName => {
  class A extends Error {
    constructor (...args) {
      super(...args)

      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, A)
      }

      this.name = ClassName
      this.type = ClassName
    }

    toJSON () {
      const ret = {
        name: this.name,
        message: this.message
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
  'SendTransaction',
  'SignData'
].forEach(e => {
  const n = `${e}Error`

  exports[n] = define(n)
})

export const instanceOfError = (e, ...args) =>
  !!Object.values(args).filter(eK => e.type === eK.type).length
