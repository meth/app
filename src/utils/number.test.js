import { addCommas, isNumber, toDecimalPlaces } from './number'

describe('.isNumber()', () => {
  it('works as expected', () => {
    expect(isNumber(2.3)).toEqual(true)
    expect(isNumber(-9.1)).toEqual(true)
    expect(isNumber('a')).toEqual(false)
    expect(isNumber(true)).toEqual(false)
    expect(isNumber(false)).toEqual(false)
    expect(isNumber(null)).toEqual(false)
    expect(isNumber(undefined)).toEqual(false)
    expect(isNumber(() => {})).toEqual(false)
    expect(isNumber({})).toEqual(false)
    expect(isNumber([])).toEqual(false)
  })
})

describe('.addCommas()', () => {
  it('handles null', () => {
    expect(addCommas(null)).toEqual(null)
  })

  it('adds commas', () => {
    expect(addCommas(0)).toEqual('0')
    expect(addCommas(0.0)).toEqual('0')
    expect(addCommas(0.1)).toEqual('0.1')
    expect(addCommas(0.22323)).toEqual('0.22323')

    expect(addCommas(1)).toEqual('1')
    expect(addCommas(1.0)).toEqual('1')
    expect(addCommas(1.1)).toEqual('1.1')
    expect(addCommas(1.22323)).toEqual('1.22323')

    expect(addCommas(207)).toEqual('207')
    expect(addCommas(207.0)).toEqual('207')
    expect(addCommas(207.1)).toEqual('207.1')
    expect(addCommas(207.22323)).toEqual('207.22323')

    expect(addCommas(109872343)).toEqual('109,872,343')
    expect(addCommas(109872343.0)).toEqual('109,872,343')
    expect(addCommas(109872343.1)).toEqual('109,872,343.1')
    expect(addCommas(109872343.22323)).toEqual('109,872,343.22323')

    expect(addCommas(9109872343)).toEqual('9,109,872,343')
    expect(addCommas(9109872343.0)).toEqual('9,109,872,343')
    expect(addCommas(9109872343.1)).toEqual('9,109,872,343.1')
    expect(addCommas(9109872343.22323)).toEqual('9,109,872,343.22323')

    expect(addCommas(9999)).toEqual('9,999')
    expect(addCommas(9999.0)).toEqual('9,999')
    expect(addCommas(9999.1)).toEqual('9,999.1')
    expect(addCommas(9999.22323)).toEqual('9,999.22323')

    expect(addCommas(10000)).toEqual('10,000')
    expect(addCommas(10000.0)).toEqual('10,000')
    expect(addCommas(10000.1)).toEqual('10,000.1')
    expect(addCommas(10000.22323)).toEqual('10,000.22323')
  })

  it('handles string inputs too', () => {
    expect(addCommas('207.0')).toEqual('207')
    expect(addCommas('207.')).toEqual('207')
    expect(addCommas('207')).toEqual('207')
    expect(addCommas('207.25')).toEqual('207.25')
  })
})

describe('.toDecimalPlaces()', () => {
  it('handles null', () => {
    expect(toDecimalPlaces(null)).toEqual(null)
  })

  it('preserves all decimals by default', () => {
    expect(toDecimalPlaces(0.125)).toEqual('0.125')
    expect(toDecimalPlaces(0.125, null)).toEqual('0.125')
  })

  it('rounds to nearest given decimal places', () => {
    expect(toDecimalPlaces(0.125, 3)).toEqual('0.125')
    expect(toDecimalPlaces(0.125, 2)).toEqual('0.13')
    expect(toDecimalPlaces(0.125, 1)).toEqual('0.1')
    expect(toDecimalPlaces(0.125, 0)).toEqual('0')
    expect(toDecimalPlaces(0.525, 0)).toEqual('1')

    expect(toDecimalPlaces(15.125, 3)).toEqual('15.125')
    expect(toDecimalPlaces(15.125, 2)).toEqual('15.13')
    expect(toDecimalPlaces(15.125, 1)).toEqual('15.1')
    expect(toDecimalPlaces(15.125, 0)).toEqual('15')
    expect(toDecimalPlaces(15.525, 0)).toEqual('16')

    expect(toDecimalPlaces(15.96, 3)).toEqual('15.960')
    expect(toDecimalPlaces(15.96, 2)).toEqual('15.96')
    expect(toDecimalPlaces(15.96, 1)).toEqual('16')
    expect(toDecimalPlaces(15.96, 0)).toEqual('16')
  })

  it('adds commas by default', () => {
    expect(toDecimalPlaces(9109872343.125, 3)).toEqual('9,109,872,343.125')
    expect(toDecimalPlaces(9109872343.125, 2)).toEqual('9,109,872,343.13')
    expect(toDecimalPlaces(9109872343.125, 1)).toEqual('9,109,872,343.1')
    expect(toDecimalPlaces(9109872343.125, 0)).toEqual('9,109,872,343')
    expect(toDecimalPlaces(999.525, 0)).toEqual('1,000')
  })

  it('can exclude commas', () => {
    expect(toDecimalPlaces(9109872343.125, 3, { showCommas: false })).toEqual('9109872343.125')
    expect(toDecimalPlaces(9109872343.125, 2, { showCommas: false })).toEqual('9109872343.13')
    expect(toDecimalPlaces(9109872343.125, 1, { showCommas: false })).toEqual('9109872343.1')
    expect(toDecimalPlaces(9109872343.125, 0, { showCommas: false })).toEqual('9109872343')
    expect(toDecimalPlaces(999.525, 0, { showCommas: false })).toEqual('1000')
  })
})
