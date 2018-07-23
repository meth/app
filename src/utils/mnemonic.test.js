import { mnemonicToList, listToMnemonic, sanitizeMnemonic } from './mnemonic'

describe('.mnemonicToList()', () => {
  it('returns list from string', () => {
    expect(mnemonicToList('  abc def  ghi j ')).toEqual([
      'abc',
      'def',
      'ghi',
      'j'
    ])
  })
})

describe('.listToMnemonic()', () => {
  it('returns string from list', () => {
    expect(listToMnemonic([ '  abc ', 'def', '', '  ghi', 'j ' ])).toEqual(
      'abc def ghi j'
    )
  })
})

describe('.sanitizeMnemonic()', () => {
  it('returns sanitized string', () => {
    expect(sanitizeMnemonic('  abc def  ghi j ')).toEqual('abc def ghi j')
  })
})
