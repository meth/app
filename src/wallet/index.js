import { EthHdWallet } from 'eth-hd-wallet'

import controller from '../redux/controller'
const log = require('../utils/log').create('Wallet')



export async function createWalletFromMnemonic (mnemonic) {
  log.info('Create wallet from mnemonic ...')

  const wallet = EthHdWallet.fromMnemonic(mnemonic)

  /*
  Discover all of this wallet's generated addresses that have previously been used.

  The disovery process works according to the BIP44 spec, albeit with
  modifications (original spec is at https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki#Account_discovery)

  - We check to address balances to see if address has been used before since
    checking for transaction history of an address is very costly to do time-wise.

  We still check upto 20 addresses after last "discovered" address. If next 20
  addresses all have balance of 0 then we stop discovery.
  */

  log.debug('Discover used wallet addresses ...')

  const nodeConnector = await controller.nodes.getCurrentConnection()

  let checked = 0
  while (20 > checked) {
    const [ nextAddress ] = wallet.generateAddresses(1)

    const balance = await nodeConnector.rawCall('eth_getBalance', [
      nextAddress, 'latest'
    ])

    log.debug('Address Balance', balance)

    if (0 < balance) {
      checked = 0
    } else {
      checked++
    }
  }

  let totalAddresses = wallet.getAddressCount() - 20

  if (0 >= totalAddresses) {
    totalAddresses = 1
  }

  log.debug(`Discovered addresses: ${totalAddresses}`)

  // regenerate wallet and initial addresses
  const finalWallet = EthHdWallet.fromMnemonic(mnemonic)
  finalWallet.generateAddresses(totalAddresses)

  return finalWallet
}
