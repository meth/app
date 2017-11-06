import { CONNECT_NODE, DISCONNECT_NODE, NODE_DISCONNECTED, NODE_CONNECTED, NODE_CONNECTING, NODE_CONNECT_ERROR } from './actions'

describe('CONNECT_NODE', () => {
  it('is defined', () => {
    expect(CONNECT_NODE).toBeDefined()
  })
})

describe('DISCONNECT_NODE', () => {
  it('is defined', () => {
    expect(DISCONNECT_NODE).toBeDefined()
  })
})

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
