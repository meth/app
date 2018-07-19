import { initialSetup, addWebFont } from './setup.ios'

describe('.initialSetup()', () => {
  it('does nothing', () => {
    expect(initialSetup()).toBeUndefined()
  })
})

describe('.addWebFont()', () => {
  it('does nothing', () => {
    expect(addWebFont()).toBeUndefined()
  })
})
