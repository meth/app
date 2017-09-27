import { NODE_DISCONNECTED, NODE_IS_CONNECTING } from './actions'

describe('NODE_DISCONNECTED', () => {
  it('is defined', () => {
    expect(NODE_DISCONNECTED).toBeDefined()
  })
})

describe('NODE_IS_CONNECTING', () => {
  it('is defined', () => {
    expect(NODE_IS_CONNECTING).toBeDefined()
  })
})
