import BigNumber from 'bignumber.js'
import {
  toBigNum,
  hexStrToNumber,
  hexStrToBigNum,
  toHexStr,
  toDecStr,
  toFormattedDecStr,
  toFloat,
  toFloatStr,
  toInt,
  toIntStr
} from './number'

describe('.toBigNum()', () => {
  it('works as expected', () => {
    expect(toBigNum(2.3)).toBeInstanceOf(BigNumber)
    expect(toBigNum(2.3).toString()).toEqual('2.3')
    expect(toBigNum(2).toString()).toEqual('2')
    expect(toBigNum(Number.MAX_SAFE_INTEGER).toString()).toEqual('9007199254740991')
    expect(toBigNum('0xdeadbeef', 16).toString()).toEqual('3735928559')
    expect(toBigNum('deadbeef', 16).toString()).toEqual('3735928559')
    expect(toBigNum('zxw').toString()).toEqual('NaN')
  })
})

describe('.hexStrToNumber()', () => {
  it('works as expected', () => {
    expect(hexStrToNumber('0xdeadbeef')).toEqual(3735928559)
    expect(hexStrToNumber('deadbeef')).toEqual(3735928559)
  })
})


describe('.hexStrToBigNum()', () => {
  it('works as expected', () => {
    expect(hexStrToBigNum('0xdeadbeef').toNumber()).toEqual(hexStrToNumber('0xdeadbeef'))
    expect(hexStrToBigNum('deadbeef').toNumber()).toEqual(hexStrToNumber('deadbeef'))
  })
})

describe('.toHexStr()', () => {
  it('works as expected', () => {
    expect(toHexStr('255')).toEqual('0xff')
    expect(toHexStr(255)).toEqual('0xff')
  })
})

describe('.toDecStr()', () => {
  it('works as expected', () => {
    expect(toDecStr('255')).toEqual('255')
    expect(toDecStr(255)).toEqual('255')
  })
})

describe('.toFormattedDecStr()', () => {
  it('adds commas', () => {
    expect(toFormattedDecStr('255.2744', 2)).toEqual('255.27')
    expect(toFormattedDecStr('2558761.2754', 2)).toEqual('2,558,761.28')
  })

  it('can avoid commas', () => {
    expect(toFormattedDecStr('255.2744', 2, { showCommas: false })).toEqual('255.27')
    expect(toFormattedDecStr('2558761.2754', 2, { showCommas: false })).toEqual('2558761.28')
  })

  it('trims excess 0s', () => {
    expect(toFormattedDecStr('255.2744', 10)).toEqual('255.2744')
    expect(toFormattedDecStr('2558761.2799', 10)).toEqual('2,558,761.2799')
    expect(toFormattedDecStr('2558761.9999', 3)).toEqual('2,558,762')
  })
})

describe('.toFloat()', () => {
  it('works as expected', () => {
    expect(toFloat('abc')).toEqual(null)
    expect(toFloat('1234.234')).toEqual(1234.234)
    expect(toFloat('-1234')).toEqual(-1234)
  })
})

describe('.toFloatStr()', () => {
  it('works as expected', () => {
    expect(toFloatStr('abc')).toEqual('')
    expect(toFloatStr('1234.234')).toEqual('1234.234')
    expect(toFloatStr('-1234')).toEqual('-1234')
  })
})

describe('.toInt()', () => {
  it('works as expected', () => {
    expect(toInt('abc')).toEqual(null)
    expect(toInt('1234.234')).toEqual(1234)
    expect(toInt('-1234')).toEqual(-1234)
  })
})

describe('.toIntStr()', () => {
  it('works as expected', () => {
    expect(toIntStr('abc')).toEqual('')
    expect(toIntStr('1234.234')).toEqual('1234')
    expect(toIntStr('-1234')).toEqual('-1234')
  })
})
