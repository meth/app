import { WEB3_REQUEST, GENERATE_ACCOUNT, SEND_TX, CANCEL_TX, TX_COMPLETED } from './actions'

describe('WEB3_REQUEST', () => {
  it('is defined', () => {
    expect(WEB3_REQUEST).toBeDefined()
  })
})

describe('GENERATE_ACCOUNT', () => {
  it('is defined', () => {
    expect(GENERATE_ACCOUNT).toBeDefined()
  })
})

describe('SEND_TX', () => {
  it('is defined', () => {
    expect(SEND_TX).toBeDefined()
  })
})

describe('CANCEL_TX', () => {
  it('is defined', () => {
    expect(CANCEL_TX).toBeDefined()
  })
})

describe('TX_COMPLETED', () => {
  it('is defined', () => {
    expect(TX_COMPLETED).toBeDefined()
  })
})
