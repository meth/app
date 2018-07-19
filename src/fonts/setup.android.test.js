describe('android', () => {
  it('is same as ios', () => {
    expect(require('./setup.android')).toEqual(require('./setup.ios'))
  })
})
