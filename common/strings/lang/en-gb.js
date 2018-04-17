const { ALL_ADDRESSES } = require('../../constants/dappPermissions')
const ADDRESS_TYPES = require('../../constants/addressTypes')

module.exports = {
  label: 'English',
  strings: {
    appName: 'Meth',
    initializing: 'Initializing',
    menu: {
      application: 'Application',
      about: 'About Meth',
      devTools: 'Developer tools',
      activeTabDevTools: 'Developer tools (browser tab)',
      reload: 'Reload',
      quit: 'Quit',
      edit: 'Edit',
      developer: 'Developer',
      undo: 'Undo',
      redo: 'Redo',
      cut: 'Cut',
      copy: 'Copy',
      paste: 'Paste',
      selectAll: 'Select all',
      navigation: 'Navigation',
      newTab: 'Open new tab',
      closeTab: 'Close current tab',
      editUrl: 'Edit current tab URL',
      previousTab: 'Goto previous tab',
      nextTab: 'Goto next tab'
    },
    network: {
      chainId: 'ChainId',
      syncing: 'Sync',
      block: 'Block',
      sync: {
        percent: '{percent}%'
      }
    },
    connector: {
      connectToNode: 'Connect to node',
      pleaseChooseNode: 'Connect to Ethereum',
      network: '{network} network',
      type: 'Type'
    },
    error: {
      userCancelledTransaction: 'User cancelled transaction',
      unableToConnect: 'Unable to connect',
      requestTimeout: 'Request timed out',
      methodCall: 'Error calling method: {method}',
      unexpected: 'Unexpected error!',
      transactionAlreadyInProgress: 'A transaction is already in progress',
      connectionError: 'There was a connection error',
      tokenAlreadyExists: 'Token already exists',
      tokenContractNotFound: 'Valid token contract not found'
    },
    home: {
      intro1: 'Welcome to Meth!',
      intro2: 'Let\'s get your wallet setup so that you can start using Ethereum Dapps!'
    },
    mnemonic: {
      intro1: 'We have generated a passphrase for you.',
      intro2: 'Make sure you write this down carefully as it cannot be recovered once lost!',
      pleaseConfirmYourMnemonic: 'Please confirm your passphrase.',
      letsMakeSureYouHaveItCorrect: 'Lets make sure you have written it down correctly.',
      putWordsInRightOrder: 'Put the words in the right order.',
      enterYourMnemonic: 'Please enter your passphrase.',
      pleaseNoteDownThisMnemonicOnPaperOffline: 'Please remember this passphrase carefully! We recommend you either memorise it thoroughly or write it down offline, on a piece of paper or something similarly secure. If you lose it you will never again be able to access your accounts! Neither we nor anyone else will be able to help you retrieve your passphrase if you forget it!',
      wordOrderStillIncorrect: 'Please put the words in the correct order!',
      inputPlaceholderText: 'separate each word by a space ...'
    },
    linkButton: {
      alreadyHavePasswordLogin: 'Already have a passphrase? Login here',
      dontHavePasswordCreateOne: 'Don\'t have a passphrase yet? Create one here',
      goBackAndGenerateAnotherMnemonic: 'Go back and start again'
    },
    button: {
      addEntry: 'Add entry',
      addAccount: 'Add account',
      generateAccount: 'Generate account',
      addToken: 'Add token',
      addCustomToken: 'Add custom token',
      editCustomToken: 'Edit custom token',
      editLabel: 'Edit label',
      viewInChainExplorer: 'View in chain explorer',
      onlyShowTokensWithBalance: 'Only show tokens with balances',
      showAllTokens: 'Show all tokens',
      sendCrypto: 'Send crypto',
      showQrCode: 'Show QR code',
      yes: 'Yes',
      no: 'No',
      save: 'Save',
      delete: 'Delete',
      close: 'Close',
      login: 'Login',
      getStarted: 'Get started',
      confirmAndSendTransaction: 'Send',
      connectToNode: 'Connect',
      disconnectFromNode: 'Disconnect',
      generateRawTransaction: 'Generate raw transaction',
      wallet: 'Wallet',
      addressBook: 'Address book',
      dappBrowser: 'Browser',
      iHaveWrittenDownMnemonic: 'I have written down my passphrase carefully',
      iHaveConfirmedMyMnemonic: 'I have successfully confirmed my passphrase',
      pressToRevealMnemonic: 'Press to reveal',
      browser: {
        forward: 'Forward',
        back: 'Back',
        reload: 'Reload',
        editPermissions: 'Edit permissions',
        newTab: 'Open new tab',
        closeTab: 'Close tab'
      }
    },
    title: {
      addressBook: 'Address book',
      editAddressLabel: 'Edit address label',
      wallet: 'Wallet',
      addToken: 'Add token',
      editToken: 'Edit token',
      sendTransaction: 'Send transaction'
    },
    addressBook: {
      filterPlaceholder: 'Filter...'
    },
    modal: {
      dappPermissions: {
        pleaseSet: 'Please decide which addresses this Dapp may access.',
        addressPermissions: 'Can access addresses',
        [ALL_ADDRESSES]: 'All my addresses'
      },
      addAccount: {
        cta: 'To generate an additional account from your password/mnemonic press the button below.'
      },
      editAddress: {
        labelInputPlaceholder: 'Enter label...',
        labelFieldLabel: 'Label',
        areYouSureYouWantToDelete: 'Are you sure you want to remove this label?'
      },
      editToken: {
        nameFieldLabel: 'Name',
        nameInputPlaceholder: 'e.g. My token',
        symbolFieldLabel: 'Symbol',
        symbolInputPlaceholder: 'e.g. SNT',
        decimalsFieldLabel: 'Decimals',
        decimalsInputPlaceholder: 'e.g. 12',
        addressFieldLabel: 'Contract address',
        addressInputPlaceholder: '0x...',
        areYouSureYouWantToDelete: 'Are you sure you want to remove this custom token?'
      },
      sendTransaction: {
        isContractCreationFieldLabel: 'Deploy a contract',
        fromFieldLabel: 'From',
        fromInputPlaceholder: '0x...',
        toFieldLabel: 'To',
        toInputPlaceholder: '0x...',
        dataFieldLabel: 'Data',
        dataInputPlaceholder: '0x...',
        contractCodeFieldLabel: 'Contract code',
        contractCodeInputPlaceholder: 'Paste code here...',
        amountFieldLabel: 'Amount',
        amountInputPlaceholder: 'Amount in {unit}',
        unitFieldLabel: 'Unit'
      },
      filterPicker: {
        filterPlaceholder: 'Filter...'
      }
    },
    wallet: {
      tokens: {
        noneConfigured: 'No tokens current configured',
        filterPlaceholder: 'Filter tokens...',
        checkBalance: 'Check balance'
      }
    },
    addressType: {
      [ADDRESS_TYPES.OWN_ACCOUNT]: 'Own account',
      [ADDRESS_TYPES.CONTRACT]: 'Contract'
    },
    config: {
      node: {
        rpc: 'Ethereum client node connected via RPC.',
        infura: 'Etherum client node hosted by Infura.io, connected to {network}.'
      }
    }
  }
}
