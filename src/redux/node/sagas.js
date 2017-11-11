import { takeLatest } from 'redux-saga/effects'

import { NODE_CONNECTED, NODE_DISCONNECTED } from './actions'

function* onNodeConnected ({ storage }, { payload: connection }) {
  yield storage.setNetwork(connection)
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
