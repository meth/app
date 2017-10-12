import { NODE_DISCONNECTED, NODE_CONNECTED, NODE_CONNECTING, NODE_CONNECT_ERROR } from './actions'

describe('NODE_DISCONNECTED', () => {
  it('is defined', () => {
    expect(NODE_DISCONNECTED).toBeDefined()
  })
})

describe('NODE_CONNECTED', () => {
  it('is defined', () => {
    expect(NODE_CONNECTED).toBeDefined()
  })
})

describe('NODE_CONNECTING', () => {
  it('is defined', () => {
    expect(NODE_CONNECTING).toBeDefined()
  })
})

describe('NODE_CONNECT_ERROR', () => {
  it('is defined', () => {
    expect(NODE_CONNECT_ERROR).toBeDefined()
  })
})
