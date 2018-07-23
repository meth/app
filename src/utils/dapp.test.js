import { createDappId, extractAddressPermissions } from './dapp'

describe('.createDappId()', () => {
  it('returns host:port based id', () => {
    expect(createDappId({ url: 'https://google.com' })).toEqual('google.com')
    expect(createDappId({ url: 'https://google.com:987' })).toEqual(
      'google.com:987'
    )
    expect(createDappId({ url: 'https://www.google.com:987' })).toEqual(
      'google.com:987'
    )
    expect(
      createDappId({ url: 'https://user:pass@www.google.com:987' })
    ).toEqual('google.com:987')
    expect(createDappId({ url: 'bzz://deadbeef' })).toEqual('deadbeef')
  })
})

describe('.extractAddressPermissions()', () => {
  it('extracts address permissions', () => {
    expect(extractAddressPermissions({})).toEqual({})

    expect(
      extractAddressPermissions({
        '0xdeadbeef': 123,
        '1abc': 456,
        '0xf987edf': 789
      })
    ).toEqual({
      '0xdeadbeef': 123,
      '0xf987edf': 789
    })
  })
})
