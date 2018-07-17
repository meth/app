import Toast from 'react-native-root-toast'
import { AppState } from 'react-native'

import {
  APP_ACTIVE,
  APP_INACTIVE,
  globalEvents,
  openExternalUrl,
  alert,
  toast
} from './'

jest.mock(
  './platform',
  () => () => ({
    openExternalUrl: 100,
    alert: 200
  }),
  { virtual: true }
)

jest.mock('react-native', () => {
  // eslint-disable-next-line global-require
  const appState = new (require('eventemitter3'))()

  appState.addEventListener = appState.addListener.bind(appState)

  return { AppState: appState }
})

jest.mock('react-native-root-toast', () =>
  require('method-mocks').setupMethodMocks({
    durations: {
      SHORT: 'short'
    },
    positions: {
      BOTTOM: 'bottom'
    }
  }))

describe('platform-specific defaults', () => {
  it('are set', () => {
    expect(openExternalUrl).toEqual(100)
    expect(alert).toEqual(200)
  })
})

describe('.toast()', () => {
  let spy

  beforeEach(() => {
    spy = jest.fn()

    Toast.setMethodMock('show', spy)
  })

  afterEach(() => {
    Toast.clearAllMethodMocks()
  })

  it('calls through to toast module', () => {
    toast('this is a message')

    expect(spy).toHaveBeenCalledWith('this is a message', {
      duration: 'short',
      position: 'bottom',
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0
    })
  })
})

describe('when app state changes', () => {
  let activeSpy
  let inactiveSpy

  beforeEach(() => {
    activeSpy = jest.fn()
    inactiveSpy = jest.fn()
    globalEvents.on(APP_ACTIVE, activeSpy)
    globalEvents.on(APP_INACTIVE, inactiveSpy)
  })

  afterEach(() => {
    globalEvents.off(APP_ACTIVE, activeSpy)
    globalEvents.off(APP_INACTIVE, inactiveSpy)
  })

  it('an ACTIVE event is triggered', () => {
    AppState.emit('change', 'active')

    expect(activeSpy).toHaveBeenCalledTimes(1)
  })

  it('an INACTIVE event is triggered', () => {
    AppState.emit('change', 'inactive')

    expect(inactiveSpy).toHaveBeenCalledTimes(1)
  })
})
