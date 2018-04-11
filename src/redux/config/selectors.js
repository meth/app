import _ from 'lodash'
import { createSelector } from 'reselect'

import { getNodeConnection } from '../node/selectors'
import { getCustomTokens } from '../account/selectors'

export const getNodes = state => state.config.get('nodes')

const _getTokens = state => state.config.get('tokens')

export const getTokenList = createSelector(
  getNodeConnection,
  _getTokens,
  getCustomTokens,
  (node, tokens = {}, customTokens = {}) => {
    const defaultTokens = _.get(tokens, _.get(node, 'network.id', null), {})

    return Object.keys(customTokens).reduce((ret, symbol) => ({
      ...ret,
      [symbol]: customTokens[symbol]
    }), defaultTokens)
  }
)
