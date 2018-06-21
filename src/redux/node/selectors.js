import { createSelector } from 'reselect'

export const getNodeIsConnected = state => state.node.get('isConnected')

export const getDisconnectReason = state => state.node.get('disconnectionReason')

export const getNodeConnection = state => state.node.get('connection')

const getLatestBlock = state => state.node.get('latestBlock')

const getSyncing = state => state.node.get('syncing')

export const getNodeState = createSelector(
  getLatestBlock, getSyncing,
  (latestBlock, syncing) => ({ latestBlock, syncing })
)

export const getLastConnectedNode = state => state.node.get('lastConnectedNode')
