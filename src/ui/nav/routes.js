import Home from '../containers/pages/Home'
import Test from '../containers/pages/Test'
import GenerateMnemonic from '../containers/pages/GenerateMnemonic'
import LoginMnemonic from '../containers/pages/LoginMnemonic'
import ConfirmNewMnemonic from '../containers/pages/ConfirmNewMnemonic'
import AddressBook from '../containers/pages/AddressBook'
import Contracts from '../containers/pages/Contracts'
import Wallet from '../containers/pages/Wallet'
import Browser from '../containers/pages/Browser'
import Transactions from '../containers/pages/Transactions'

export const routes = {
  Home: {
    screen: Home,
    path: ''
  },
  Test: {
    screen: Test,
    path: 'test'
  },
  GenerateMnemonic: {
    screen: GenerateMnemonic,
    path: 'generate'
  },
  LoginMnemonic: {
    screen: LoginMnemonic,
    path: 'login'
  },
  ConfirmNewMnemonic: {
    screen: ConfirmNewMnemonic,
    path: 'confirm'
  },
  Wallet: {
    screen: Wallet,
    path: 'wallet'
  },
  AddressBook: {
    screen: AddressBook,
    path: 'addressBook'
  },
  Contracts: {
    screen: Contracts,
    path: 'contracts'
  },
  Browser: {
    screen: Browser,
    path: 'browser'
  },
  Transactions: {
    screen: Transactions,
    path: 'transactions'
  }
}

export const initialRoute = routes.LoginMnemonic
export const onceLoggedInRoute = routes.Wallet
