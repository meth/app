import { BALANCES, SEND_TX, TX_SENDING, TX_SENT, TX_SEND_ERROR } from './actions'

describe('BALANCES', () => {
  it('is defined', () => {
    expect(BALANCES).toBeDefined()
  })
})

describe('SEND_TX', () => {
  it('is defined', () => {
    expect(SEND_TX).toBeDefined()
  })
})

describe('TX_SENDING', () => {
  it('is defined', () => {
    expect(TX_SENDING).toBeDefined()
  })
})

describe('TX_SENT', () => {
  it('is defined', () => {
    expect(TX_SENT).toBeDefined()
  })
})

describe('TX_SEND_ERROR', () => {
  it('is defined', () => {
    expect(TX_SEND_ERROR).toBeDefined()
  })
})
