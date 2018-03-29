import {
  SEND_RAW_TX,
  GENERATE_RAW_TX,
  LOAD_WALLET,
  GENERATE_MNEMONIC,
  SAVE_DAPP_PERMISSIONS,
  SAVE_ADDRESS_BOOK_ENTRY
} from './actions'
import { getDappPermissions, getAddressBook } from './selectors'
import { getNodeConnection } from '../node/selectors'
import { createAction } from '../utils'
import logger from '../../logger'

const log = logger.create('walletMiddleware')

// eslint-disable-next-line consistent-return
export default ({
  storage, nodeConnector, walletManager
}) => ({ getState }) => next => async action => {
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
      const { network: { chainId } } = getNodeConnection(getState())
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
      const { dappId, permissions } = action.payload

      log.debug(`Save dapp permissions (${dappId}) ...`)

      const dappPermissions = getDappPermissions(getState())

      dappPermissions[dappId] = permissions

      await storage.saveDappPermissions(dappPermissions)

      return next(action)
    }
    case SAVE_ADDRESS_BOOK_ENTRY: {
      const { address, data } = action.payload

      log.debug(`Save addressbook entry (${address}) ...`)

      const book = getAddressBook(getState())

      book[address] = data

      await storage.saveAddressBook(book)

      return next(action)
    }
    default: {
      return next(action)
    }
  }
}
