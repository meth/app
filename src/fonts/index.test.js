import { setupFonts, addFontForWeb, FONTS } from './'
import setupMethods from './setup'

jest.mock('./setup', () => require('method-mocks').setupMethodMocks({}), { virtual: true })

describe('.setupFonts()', () => {
  let spy

  beforeEach(() => {
    spy = setupMethods.setMethodMock('initialSetup', jest.fn())
  })

  afterEach(() => {
    setupMethods.clearAllMethodMocks()
  })

  it('calls initialSetup()', () => {
    setupFonts()

    expect(spy).toHaveBeenCalled()
  })
})

describe('.addFontForWeb()', () => {
  let spy

  beforeEach(() => {
    spy = setupMethods.setMethodMock('addWebFont', jest.fn())
  })

  afterEach(() => {
    setupMethods.clearAllMethodMocks()
  })

  it('calls addWebFont()', () => {
    addFontForWeb(1, 2, 3)

    expect(spy).toHaveBeenCalledWith(1, 2, 3)
  })
})

describe('.FONTS', () => {
  it('is correct', () => {
    expect(FONTS).toMatchSnapshot()
  })
})
