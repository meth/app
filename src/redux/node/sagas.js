import { takeLatest } from 'redux-saga/effects'

import { NODE_CONNECTED, NODE_DISCONNECTED } from './actions'

function* onNodeConnected ({ storage }, { payload: { node, network } }) {
  yield storage.setNetwork(network)
  yield storage.saveLastConnectedNode(node)
}

function* onNodeDisconnected ({ storage }) {
  yield storage.setNetwork()
}

export default app => function* saga () {
  yield takeLatest(NODE_CONNECTED, onNodeConnected, app)
  yield takeLatest(NODE_DISCONNECTED, onNodeDisconnected, app)
}

export const _privateFunctions = {
  onNodeConnected,
  onNodeDisconnected
}
