import * as errors from './errors'

describe('errors', () => {
  [
    'InvalidParams',
    'MethodNotAllowed',
    'RequestTimeout',
    'UnableToConnect',
    'CorruptData',
    'WalletNotLoaded',
    'SendTransaction',
    'SignData'
  ].forEach(name => {
    const className = `${name}Error`
    const Klass = errors[className]

    it(`${className} defined`, () => {
      expect(Klass).toBeDefined()
      expect(Klass.type).toEqual(className)
    })

    it(`${className} can be created`, () => {
      const e = new Klass('test')

      expect(e.name).toEqual(className)
      expect(e.type).toEqual(className)
      expect(e).toBeInstanceOf(Error)
      expect(JSON.stringify(e)).toEqual(JSON.stringify({
        name: className,
        message: 'test'
      }))
    })
  })

  describe('.instanceOfError()', () => {
    it('can check across multiple classes', () => {
      const e = new errors.SignDataError('test')

      expect(errors.instanceOfError(e, Error)).toBe(false)
      expect(
        errors.instanceOfError(e, errors.SignDataError)
      ).toBe(true)
      expect(
        errors.instanceOfError(e, errors.SignDataError, errors.SendTransactionError)
      ).toBe(true)
      expect(
        errors.instanceOfError(e, errors.RequestTimeoutError, errors.SendTransactionError)
      ).toBe(false)
    })
  })
})
