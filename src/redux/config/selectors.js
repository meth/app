import _ from 'lodash'
import { createSelector } from 'reselect'

import { getNodeConnection } from '../node/selectors'
import { getCustomTokens } from '../account/selectors'

export const getNodes = state => state.config.get('nodes')

export const getNodesAsFlatList = createSelector(
  getNodes,
  nodes => (
    Object.keys(nodes).reduce((list, category) => (
      list.concat(nodes[category].connections)
    ), [])
  )
)

const _getTokens = state => state.config.get('tokens')

export const getTokenList = createSelector(
  getNodeConnection,
  _getTokens,
  getCustomTokens,
  (node, tokens = {}, customTokens = {}) => {
    const defaultTokens = _.get(tokens, _.get(node, 'network.id', null), {})

    return Object.keys(customTokens).reduce((ret, symbol) => ({
      ...ret,
      [symbol]: {
        ...customTokens[symbol],
        isCustom: true
      }
    }), defaultTokens)
  }
)

export const getLastGasPrice = state => state.config.get('lastGasPrice')

const _getAppSettings = state => state.config.get('appSettings') || {}

export const getSecurityPin = createSelector(
  _getAppSettings,
  settings => settings.pin || null
)
