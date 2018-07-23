jest.mock('react-native-securerandom', () => {})

describe('android', () => {
  it('is same as ios', () => {
    expect(require('./index.android')).toBe(require('./index.ios'))
  })
})
