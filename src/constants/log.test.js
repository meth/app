import { MAX_ITEMS, LEVELS } from './log'

const { INFO, WARN, ERROR, ALERT } = LEVELS

describe('MAX_ITEMS', () => {
  it('is set', () => {
    expect(MAX_ITEMS).toEqual(5000)
  })
})

describe('INFO', () => {
  it('is defined', () => {
    expect(INFO).toBeTruthy()
  })
})

describe('WARN', () => {
  it('is defined', () => {
    expect(WARN).toBeTruthy()
  })
})

describe('ERROR', () => {
  it('is defined', () => {
    expect(ERROR).toBeTruthy()
  })
})

describe('ALERT', () => {
  it('is defined', () => {
    expect(ALERT).toBeTruthy()
  })
})
