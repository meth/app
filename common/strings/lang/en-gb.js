const { GENERATE_ADDRESS } = require('../../constants/api')
const { ALL_ADDRESSES } = require('../../constants/dappPermissions')

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
    connector: {
      connectToNode: 'Connect to node',
      pleaseChooseNode: 'Connect to an Ethereum node',
      network: '{network} network'
    },
    error: {
      userCancelledTransaction: 'User cancelled transaction',
      unableToConnect: 'Unable to connect',
      requestTimeout: 'Request timed out',
      methodCall: 'Error calling method: {method}',
      unexpected: 'An unexpected error occurred',
      transactionAlreadyInProgress: 'A transaction is already in progress',
      connectionError: 'There was a connection error'
    },
    home: {
      intro1: 'Welcome to Meth!',
      intro2: 'We are going to help you get setup so that you can start using Ethereum Dapps!'
    },
    log: {
      appEvents: 'App log'
    },
    mnemonic: {
      intro1: 'We have now generated a mnemonic (secure pass phrase) for you.',
      intro2: 'You will need this to use Meth.',
      intro3: 'Make sure you write this down carefully as it cannot be recovered once lost!',
      pleaseConfirmYourMnemonic: 'Please confirm your mnemonic.',
      letsMakeSureYouHaveItCorrect: 'Lets make sure you have written it down correctly.',
      putWordsInRightOrder: 'Put the words in the right order.',
      enterYourMnemonic: 'Please enter your mnemonic.',
      pleaseNoteDownThisMnemonicOnPaperOffline: 'Please remember this mnemonic carefully! We recommend you either memorise it thoroughly or write it down offline, on a piece of paper or something similarly secure. If you lose it you will never again be able to access your accounts! Neither we nor anyone else will be able to help you retrieve your mnemonic if you forget it!',
      wordOrderStillIncorrect: 'Please put the words in the correct order!',
      inputPlaceholderText: 'separate each word by a space ...'
    },
    linkButton: {
      alreadyHavePasswordLogin: 'Already have a mnemonic? Login here',
      dontHavePasswordCreateOne: 'Don\'t have a mnemonic yet? Create one here',
      goBackAndGenerateAnotherMnemonic: 'Go back and start again'
    },
    button: {
      save: 'Save',
      close: 'Close',
      login: 'Login',
      getStarted: 'Get started',
      confirmAndSendTransaction: 'Send',
      connectToNode: 'Connect',
      disconnectFromNode: 'Disconnect',
      cancelTransaction: 'Cancel',
      generateRawTransaction: 'Generate raw transaction',
      iHaveWrittenDownMnemonic: 'I have written down my mnemonic and wish to proceed',
      iHaveConfirmedMyMnemonic: 'I have successfully confirmed my mnemonic',
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
    config: {
      node: {
        local: {
          local: 'Ethereum client node running locally on device.'
        },
        infura: {
          mainnet: 'Etherum client node hosted by Infura.io, connected to the Main network.',
          ropsten: 'Etherum client node hosted by Infura.io, connected to the Ropsten test network.',
          kovan: 'Etherum client node hosted by Infura.io, connected to the Kovan test network.',
          rinkeby: 'Etherum client node hosted by Infura.io, connected to the Rinkeby test network.'
        }
      }
    },
    dappPermissions: {
      pleaseSet: 'Please decide which addresses and special privileges this Dapp may access.',
      addressPermissions: 'Can access addresses',
      [ALL_ADDRESSES]: 'All my addresses',
      apiPermissions: 'Can access privileges',
      api: {
        [GENERATE_ADDRESS]: 'Generate new addresses'
      }
    },
    sync: {
      upToDate: 'complete',
      percent: '{percent}%'
    }
  }
}
