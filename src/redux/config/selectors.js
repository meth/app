import _ from 'lodash'
import { createSelector } from 'reselect'

import { getNodeConnection } from '../node/selectors'

export const getNodes = state => state.config.get('nodes')

const _getTokens = state => state.config.get('tokens')

export const getTokenList = createSelector(
  getNodeConnection,
  _getTokens,
  (node, tokens) => (tokens || {})[_.get(node, 'network.id')] || []
)
