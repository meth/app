import { trimProtocol, addProtocol } from './url'

describe('.trimProtocol()', () => {
  it('trims the protocol away', () => {
    expect(trimProtocol('abc')).toEqual('abc')
    expect(trimProtocol('https://abc')).toEqual('abc')
    expect(trimProtocol('ftp://abc')).toEqual('abc')
    expect(trimProtocol('ftp:/abc')).toEqual('ftp:/abc')
  })
})

describe('.addProtocol()', () => {
  it('adds protocol prefix', () => {
    expect(addProtocol('abc')).toEqual('http://abc')
    expect(addProtocol('https://abc')).toEqual('https://abc')
    expect(addProtocol('ftp://abc')).toEqual('ftp://abc')
    expect(addProtocol('ftp:/abc')).toEqual('http://ftp:/abc')
    expect(addProtocol('abc', 'ssh')).toEqual('ssh://abc')
  })
})
