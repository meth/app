import {
  SEND_RAW_TX,
  GENERATE_RAW_TX,
  LOAD_WALLET,
  GENERATE_MNEMONIC,
  SAVE_DAPP_PERMISSIONS
} from './actions'
import { getNodeConnection } from '../node/selectors'
import { createAction } from '../utils'
import logger from '../../logger'

const log = logger.create('walletMiddleware')

// eslint-disable-next-line consistent-return
export default ({ nodeConnector, walletManager }) => store => next => async action => {
  switch (action.type) {
    case GENERATE_MNEMONIC: {
      return walletManager.generateMnemonic()
    }
    case LOAD_WALLET: {
      log.debug('Load wallet ...')

      const mnemonic = action.payload
      log.debug(`Mnemonic: ${mnemonic}`)

      await walletManager.load(mnemonic)

      return next(action)
    }
    case GENERATE_RAW_TX: {
      log.debug('Generate raw tx ...')

      const { from, to, value, data, gasLimit, gasPrice } = action.payload

      // chain id
      const { network: { chainId } } = getNodeConnection(store.getState())
      log.debug(`chainId: ${chainId}`)

      // nonce
      const nonce = await nodeConnector.rawCall('eth_getTransactionCount', [ from, 'latest' ])
      log.debug(`nonce: ${nonce}`)

      return walletManager.wallet().sign({
        from, to, value, data, gasLimit, gasPrice, nonce, chainId
      })
    }
    case SEND_RAW_TX: {
      const rawTx = action.payload

      const receipt =
        await nodeConnector.rawCall('eth_sendRawTransaction', [ rawTx ])

      await next(createAction(action.type, receipt))

      return Promise.resolve(receipt)
    }
    case SAVE_DAPP_PERMISSIONS: {
      // TODO
      break
    }
    default: {
      return next(action)
    }
  }
}
