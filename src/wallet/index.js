import _ from 'lodash'
import { EthHdWallet } from 'eth-hd-wallet'
import EventEmitter from 'eventemitter3'
import { toBN } from 'web3-utils'

import logger from '../utils/log'
import { WalletNotLoadedError } from '../utils/errors'
import { EVENT, STATE } from '../../common/constants'
import controller from '../redux/controller'

const log = logger.create('Wallet')

class Wallet extends EventEmitter {
  constructor () {
    super()

    this._onNodeConnectionStateChange = this._onNodeConnectionStateChange.bind(
      this
    )
    this._onNewBlock = this._onNewBlock.bind(this)
  }

  /**
   * Load wallet data using mnemonic.
   *
   * @param  {String}  mnemonic
   * @return {Promise}
   */
  async load (mnemonic) {
    log.info(`Load wallet (${mnemonic})...`)

    this._mnemonic = mnemonic

    await this._load()

    const NodeConnector = await this._getNodeConnection()

    NodeConnector.on(EVENT.STATE_CHANGE, this._onNodeConnectionStateChange)
    NodeConnector.on(EVENT.NEW_BLOCK, this._onNewBlock)
  }

  /**
   * Unload current wallet data.
   * @return {Promise}
   */
  async unload () {
    log.info('Unload wallet ...')

    const NodeConnector = await this._getNodeConnection()

    NodeConnector.removeListener(
      EVENT.STATE_CHANGE,
      this._onNodeConnectionStateChange
    )
    NodeConnector.removeListener(EVENT.NEW_BLOCK, this._onNewBlock)

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
   * Get node connection
   * @return {Promise}
   */
  async _getNodeConnection () {
    return controller.nodes.getCurrentConnection()
  }

  /**
   * Get balance of address
   * @return {Promise}
   */
  async _getBalance (address) {
    const NodeConnector = await this._getNodeConnection()

    return NodeConnector.rawCall('eth_getBalance', [ address, 'latest' ])
  }

  /**
   * Handler for node connection state change event
   */
  _onNodeConnectionStateChange (newState) {
    log.debug('Node connection state changed')

    if (!this._hdWallet) {
      return
    }

    switch (newState) {
      // once reconnected, re-init the wallet
      case STATE.CONNECTED:
        log.info('Node connection re-established, reloading wallet data ...')
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

    log.debug('New block received ...')

    this._updateBalances()
  }

  _updateBalances () {
    log.debug('Update address balances ...')

    const addresses = this._hdWallet.getAddresses()

    Promise.all(addresses.map(a => this._getBalance(a)))
      .then(balances => {
        this._balances = balances.map(toBN)

        this.emit(EVENT.NEW_BALANCES, this.getAccountBalances())
      })
      .catch(err => {
        log.debug('Balance query error', err)
      })
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
   * Reload wallet data.
   * @return {Promise}
   */
  async _reload () {
    log.debug('Reload wallet ...')

    this._hdWallet = null

    await this._load()
  }

  /**
   * Load wallet data using stored mnemonic.
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
  async _load () {
    log.debug('Load wallet from mnemonic ...')

    const wallet = EthHdWallet.fromMnemonic(this._mnemonic)

    log.debug('Discover used wallet addresses ...')

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

    this._updateBalances()
  }
}

export default new Wallet()
