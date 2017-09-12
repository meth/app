import AsyncEvents from '../utils/asyncEvents'

const define = arr =>
  arr.reduce((m, v) => {
    m[v] = v
    return m
  }, {})

export const buildAction = (type, originalPayload = {}) => {
  const payload =
    originalPayload && originalPayload instanceof Error
      ? { error: originalPayload }
      : originalPayload

  return { type, payload }
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
