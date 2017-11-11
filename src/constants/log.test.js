import { MAX_ITEMS, LEVELS } from './log'

const { INFO, WARN, ERROR, ALERT } = LEVELS

describe('MAX_ITEMS', () => {
  it('is set', () => {
    expect(MAX_ITEMS).toEqual(5000)
  })
})

describe('INFO', () => {
  it('is defined', () => {
    expect(INFO).toBeDefined()
  })
})

describe('WARN', () => {
  it('is defined', () => {
    expect(WARN).toBeDefined()
  })
})

describe('ERROR', () => {
  it('is defined', () => {
    expect(ERROR).toBeDefined()
  })
})

describe('ALERT', () => {
  it('is defined', () => {
    expect(ALERT).toBeDefined()
  })
})
