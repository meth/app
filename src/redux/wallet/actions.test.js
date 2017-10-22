import { BALANCES, SEND_RAW_TX, GENERATE_RAW_TX } from './actions'

describe('BALANCES', () => {
  it('is defined', () => {
    expect(BALANCES).toBeDefined()
  })
})

describe('GENERATE_RAW_TX', () => {
  it('is defined', () => {
    expect(GENERATE_RAW_TX).toBeDefined()
  })
})

describe('SEND_RAW_TX', () => {
  it('is defined', () => {
    expect(SEND_RAW_TX).toBeDefined()
  })
})
