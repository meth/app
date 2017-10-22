export const getNodeIsConnected = state => state.node.get('isConnected')

export const getDisconnectReason = state => state.node.get('disconnectReason')

export const getConnectionEvent = state => state.node.get('connectEvent')

export const getNetworkInfo = state => state.node.get('networkInfo')
