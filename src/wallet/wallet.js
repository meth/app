import _ from 'lodash'
import { EthHdWallet } from 'eth-hd-wallet'
import EventEmitter from 'eventemitter3'
import { toBN } from 'web3-utils'

import logger from '../logger'
import { WalletNotLoadedError } from '../utils/errors'
import { updateAccountBalances } from '../redux/wallet/actionCreators'
import EVENT from '../constants/events'
import STATE from '../constants/states'

const log = logger.create('Wallet')

class Wallet extends EventEmitter {
  constructor ({ store, nodeConnector }, mnemonic) {
    super()

    this._nodeConnector = nodeConnector
    this._store = store
    this._mnemonic = mnemonic
  }

  /**
   * Initialize this wallet.
   *
   * Should be called after construction.
   *
   * @return {Promise}
   */
  async init () {
    log.info(`Initialize wallet ...`)

    this._nodeConnector.on(
      EVENT.STATE_CHANGE,
      this._onNodeConnectionStateChange.bind(this)
    )

    this._nodeConnector.on(EVENT.NEW_BLOCK, this._onNewBlock.bind(this))

    // do this asynchronously!
    this._reload()
  }

  /**
   * Reset this wallet.
   *
   * `init()` will need to be called to again use this wallet.
   *
   * @return {Promise}
   */
  async destroy () {
    log.info('Unload wallet ...')

    this._nodeConnector.removeListener(
      EVENT.STATE_CHANGE,
      this._onNodeConnectionStateChange
    )
    this._nodeConnector.removeListener(EVENT.NEW_BLOCK, this._onNewBlock)

    this._hdWallet = null
    this._balances = []
  }

  /**
   * Get all generated accounts.
   * @return {Array}
   */
  getAccounts () {
    return this._hdWallet ? this._hdWallet.getAddresses() : []
  }

  /**
   * Get all generated accounts along with their balances.
   * @return {Object}
   */
  getAccountBalances () {
    return this._hdWallet
      ? _.zipObject(this._hdWallet.getAddresses(), this._balances)
      : {}
  }

  /**
   * Generate next account.
   * @return {String} address generated
   */
  generateAccount () {
    this._ensureLoaded()

    const addr = this._hdWallet.generateAddresses(1).pop()

    log.info(`Generated new address: ${addr}`)

    // update balances
    this._updateBalances()

    return addr
  }

  /**
   * Generate signed transaction.
   *
   * @param  {String} from From address
   * @param  {String} [to] If omitted then deploying a contract
   * @param  {Number} value Amount of wei to send
   * @param  {String} data Data
   * @param  {Number} gasLimit Total Gas to use
   * @param  {Number} gasPrice Gas price (wei per gas unit)
   * @param  {String} chainId Chain id
   *
   * @return {String} Raw transaction string.
   */
  sign ({ nonce, from, to, value, data, gasLimit, gasPrice, chainId }) {
    return this._hdWallet.sign({
      nonce,
      from,
      to,
      value,
      data,
      gasLimit,
      gasPrice,
      chainId
    })
  }

  /**
   * Get balance of address
   * @return {Promise}
   */
  async _getBalance (address) {
    return this._nodeConnector.rawCall('eth_getBalance', [ address, 'latest' ])
  }

  /**
   * Handler for node connection state change event
   */
  _onNodeConnectionStateChange (newState) {
    log.debug('Node connection state changed')

    switch (newState) {
      // once connected
      case STATE.CONNECTED:
        log.info('Node connection established, re/loading wallet data ...')
        // re-load the wallet data
        this._reload()
        break

      default:
        break
    }
  }

  /**
   * Handler for new block event
   */
  _onNewBlock () {
    if (!this._hdWallet) {
      return
    }

    log.debug('New block received, update balances ...')

    this._updateBalances()
  }

  /**
   * Update account balances\
   */
  async _updateBalances () {
    log.debug('Update address balances ...')

    const addresses = this._hdWallet.getAddresses()

    try {
      const balances = await Promise.all(
        addresses.map(a => this._getBalance(a))
      )

      await this._setBalancesAndNotifyStore(balances)
    } catch (err) {
      log.warn('Balance query error, network probably not ready')
    }
  }

  async _setBalancesAndNotifyStore (balances) {
    this._balances = balances.map(toBN)

    await this._store.dispatch(
      updateAccountBalances(this.getAccountBalances())
    )
  }

  /**
   * Ensure wallet data has been loaded.
   *
   * @throws {Error} if wallet not loaded
   */
  _ensureLoaded () {
    if (!this._hdWallet) {
      throw new WalletNotLoadedError('Wallet data not yet loaded')
    }
  }

  /**
   * Reload wallet data using stored mnemonic.
   *
   * Discover all of this wallet's generated addresses that have previously been used.
   *
   * The disovery process works according to the BIP44 spec, albeit with
   * modifications (original spec is at https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki#Account_discovery)
   *
   * - We check to address balances to see if address has been used before since
   *  checking for transaction history of an address is very costly to do time-wise.
   *
   * We still check upto 20 addresses after last "discovered" address. If next 20
   * addresses all have balance of 0 then we stop discovery.
   *
   * @return {Promise}
   */
  async _reload () {
    try {
      this._hdWallet = null

      log.debug('Load wallet from mnemonic ...')

      const wallet = EthHdWallet.fromMnemonic(this._mnemonic)

      log.debug('Discover used wallet addresses ...')

      const balances = []

      let checked = 0
      while (20 > checked) {
        const [ nextAddress ] = wallet.generateAddresses(1)

        // eslint-disable-next-line no-await-in-loop
        const balance = await this._getBalance(nextAddress)

        if (0 < balance) {
          checked = 0
        } else {
          checked += 1
        }

        // save balance
        balances.push(balance)
      }

      let totalAddresses = wallet.getAddressCount() - 20
      if (0 >= totalAddresses) {
        totalAddresses = 1
      }

      log.info(`Discovered addresses: ${totalAddresses}`)

      // regenerate wallet and initial addresses
      const finalWallet = EthHdWallet.fromMnemonic(this._mnemonic)
      finalWallet.generateAddresses(totalAddresses)

      this._hdWallet = finalWallet

      // setup initial balances
      await this._setBalancesAndNotifyStore(
        balances.slice(0, totalAddresses).map(toBN)
      )
    } catch (err) {
      log.warn('Loading error, network probably not ready yet')
    }
  }
}

export default Wallet
