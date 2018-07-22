import web3utils from 'web3-utils'

import { isAddress, isHexStrict, toChecksumAddress, prefixWith0x, prefixedWith0x, randStr } from './string'

describe('.isAddress()', () => {
  it('same as from web3 utils', () => {
    expect(isAddress).toBe(web3utils.isAddress)
  })
})

describe('.isHexStrict()', () => {
  it('same as from web3 utils', () => {
    expect(isHexStrict).toBe(web3utils.isHexStrict)
  })
})

describe('.toChecksumAddress()', () => {
  it('same as from web3 utils', () => {
    expect(toChecksumAddress).toBe(web3utils.toChecksumAddress)
  })
})

describe('.prefixWith0x()', () => {
  it('prefixes with 0x', () => {
    expect(prefixWith0x('abc')).toEqual('0xabc')
    expect(prefixWith0x('0xabc')).toEqual('0xabc')
  })
})

describe('.prefixedWith0x()', () => {
  it('checks if prefixed with 0x', () => {
    expect(prefixedWith0x('abc')).toEqual(false)
    expect(prefixedWith0x('0xabc')).toEqual(true)
  })
})

describe('.randStr()', () => {
  it('returns random string', () => {
    expect(typeof randStr(2)).toEqual('string')
    expect(randStr(2).length).toEqual(2)
    expect(typeof randStr(5)).toEqual('string')
    expect(randStr(5).length).toEqual(5)
  })
})
