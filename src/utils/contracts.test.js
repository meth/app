import ABI from '../../testdata/tokenContract.abi.json'
import {
  getAbiFunctionNames,
  isAbiFunctionReadOnly,
  getOrderedMethodParams,
  methodHasOutputs
} from './contracts'

describe('.getAbiFunctionNames()', () => {
  it('returns null if invalid', () => {
    expect(getAbiFunctionNames('blah')).toEqual(null)
  })

  it('returns results if valid', () => {
    expect(getAbiFunctionNames(ABI)).toMatchSnapshot()
  })
})

describe('.isAbiFunctionReadOnly()', () => {
  it('throws if invalid', () => {
    expect(() => isAbiFunctionReadOnly('blah')).toThrow()
  })

  it('returns false if read-write', () => {
    expect(isAbiFunctionReadOnly(ABI, 'approve')).toEqual(false)
  })

  it('returns false if read-only', () => {
    expect(isAbiFunctionReadOnly(ABI, 'name')).toEqual(true)
  })
})

describe('.getOrderedMethodParams()', () => {
  it('throws if invalid', () => {
    expect(() => getOrderedMethodParams('blah', 'approve')).toThrow()
  })

  it('returns params', () => {
    const params = {
      tokens: 1,
      spender: 2
    }

    expect(getOrderedMethodParams(ABI, 'approve', params)).toEqual([ 2, 1 ])
  })
})

describe('.methodHasOutputs()', () => {
  it('throws if invalid', () => {
    expect(() => methodHasOutputs('blah', 'approve')).toThrow()
  })

  it('returns false if no outputs', () => {
    expect(methodHasOutputs(ABI, 'transferOwnership')).toEqual(false)
  })

  it('returns true if has outputs', () => {
    expect(methodHasOutputs(ABI, 'approve')).toEqual(true)
  })
})
