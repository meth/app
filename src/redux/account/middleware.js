import _ from 'lodash'
import {
  SEND_TX,
  CANCEL_TX,
  SEND_RAW_TX,
  GENERATE_RAW_TX,
  LOAD_WALLET,
  GENERATE_MNEMONIC,
  SAVE_DAPP_PERMISSIONS,
  SAVE_ADDRESS_BOOK_ENTRY,
  DELETE_ADDRESS_BOOK_ENTRY,
  TOKEN_BALANCE
} from './actions'
import { Erc20 } from '../../abi'
import { t } from '../../../common/strings'
import { getStore } from '../'
import { createAction } from '../utils'
import { SendTransactionError } from '../../utils/errors'
import logger from '../../logger'

const log = logger.create('walletMiddleware')

// eslint-disable-next-line consistent-return
export default ({
  storage, nodeConnector, walletManager
}) => () => next => async action => {
  const { selectors: {
    getDappPermissions,
    getAddressBook,
    getTxDeferred,
    getNodeConnection,
    getTokenList
  } } = getStore()

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
    case SEND_TX: {
      const existingDeferred = getTxDeferred()

      if (existingDeferred) {
        return Promise.reject(
          new SendTransactionError(t('error.transactionAlreadyInProgress'))
        )
      }

      let deferred = null

      const promise = new Promise((resolve, reject) => {
        deferred = { resolve, reject }
      })

      await next(createAction(SEND_TX, {
        ...action.payload,
        deferred
      }))

      // we return a promise which the caller can wait on to know if/when the
      // tx passes/fails
      return promise
    }
    case CANCEL_TX: {
      const deferred = getTxDeferred()

      if (deferred) {
        deferred.reject(action.payload)
      }

      return next(action)
    }
    case GENERATE_RAW_TX: {
      log.debug('Generate raw tx ...')

      const { from, to, value, data, gasLimit, gasPrice } = action.payload

      // chain id
      const { network: { chainId } } = getNodeConnection()
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

      const dappPermissions = getDappPermissions()

      dappPermissions[dappId] = permissions

      await storage.saveDappPermissions(dappPermissions)

      return next(action)
    }
    case SAVE_ADDRESS_BOOK_ENTRY: {
      const { address, data } = action.payload

      log.debug(`Save addressbook entry (${address}) ...`)

      const book = getAddressBook()

      book[address] = data

      await storage.saveAddressBook(book)

      return next(action)
    }
    case DELETE_ADDRESS_BOOK_ENTRY: {
      const { address } = action.payload

      log.debug(`Delete addressbook entry (${address}) ...`)

      const book = getAddressBook()

      delete book[address]

      await storage.saveAddressBook(book)

      return next(action)
    }
    case TOKEN_BALANCE: {
      const { token, accountAddress } = action.payload

      const { address: tokenContractAddress } = _.get(getTokenList(), token, {})

      const contract = await nodeConnector.getContractAt(tokenContractAddress, { abi: Erc20 })

      const balance = await contract.balanceOf(accountAddress)

      return next(createAction(TOKEN_BALANCE, {
        ...action.payload,
        balance
      }))
    }
    default: {
      return next(action)
    }
  }
}
