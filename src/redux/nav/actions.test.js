import { NavigationActions } from 'react-navigation'

import { RESET, PUSH, BACK } from './actions'

describe('RESET', () => {
  it('matches RESET in react-navigation', () => {
    expect(RESET).toEqual(NavigationActions.RESET)
  })
})

describe('PUSH', () => {
  it('matches NAVIGATE in react-navigation', () => {
    expect(PUSH).toEqual(NavigationActions.NAVIGATE)
  })
})

describe('BACK', () => {
  it('matches BACK in react-navigation', () => {
    expect(BACK).toEqual(NavigationActions.BACK)
  })
})
