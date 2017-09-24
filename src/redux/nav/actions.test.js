import { RESET, PUSH } from './actions'

const NavigationActions = require('react-navigation/lib/NavigationActions')
  .default

describe('RESET', () => {
  it('matches what is in react-navigation', () => {
    expect(RESET).toEqual(NavigationActions.RESET)
  })
})

describe('PUSH', () => {
  it('matches what is in react-navigation', () => {
    expect(PUSH).toEqual(NavigationActions.NAVIGATE)
  })
})
