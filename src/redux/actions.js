import AsyncEvents from '../utils/asyncEvents'

const define = arr =>
  arr.reduce((m, v) => {
    m[v] = v
    return m
  }, {})

export const buildAction = (type, payload = {}) => {
  if (payload && payload instanceof Error) {
    payload = {
      error: payload
    }
  }

  return {
    type: type,
    payload: payload
  }
}

export const Actions = define([
  'SET_MNEMONIC',
  'CONFIG',
  'SEND_TRANSACTION',
  'NODE_DISCONNECTED',
  'ACCOUNT_BALANCES',
  'SHOW_MODAL',
  'HIDE_MODAL'
])

export const StateActions = AsyncEvents
