import { ACCOUNT_BALANCES, GENERATE_MNEMONIC, SEND_RAW_TX, GENERATE_RAW_TX, LOAD_WALLET } from './actions'

describe('ACCOUNT_BALANCES', () => {
  it('is defined', () => {
    expect(ACCOUNT_BALANCES).toBeDefined()
  })
})

describe('GENERATE_MNEMONIC', () => {
  it('is defined', () => {
    expect(GENERATE_MNEMONIC).toBeDefined()
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

describe('LOAD_WALLET', () => {
  it('is defined', () => {
    expect(LOAD_WALLET).toBeDefined()
  })
})
