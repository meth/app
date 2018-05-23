import Home from '../containers/pages/Home'
import Test from '../containers/pages/Test'
import GenerateMnemonic from '../containers/pages/GenerateMnemonic'
import LoginMnemonic from '../containers/pages/LoginMnemonic'
import ConfirmNewMnemonic from '../containers/pages/ConfirmNewMnemonic'
import SetupPin from '../containers/pages/SetupPin'
import EnterPinAfterLogin from '../containers/pages/EnterPinAfterLogin'
import AddressBook from '../containers/pages/AddressBook'
import Contracts from '../containers/pages/Contracts'
import Wallet from '../containers/pages/Wallet'
import Browser from '../containers/pages/Browser'
import Transactions from '../containers/pages/Transactions'

const routes = {
  Home: { screen: Home },
  Test: { screen: Test },
  GenerateMnemonic: { screen: GenerateMnemonic },
  LoginMnemonic: { screen: LoginMnemonic },
  ConfirmNewMnemonic: { screen: ConfirmNewMnemonic },
  SetupPin: { screen: SetupPin },
  EnterPinAfterLogin: { screen: EnterPinAfterLogin },
  Wallet: { screen: Wallet },
  AddressBook: { screen: AddressBook },
  Contracts: { screen: Contracts },
  Browser: { screen: Browser },
  Transactions: { screen: Transactions }
}

// add route name to object
Object.keys(routes).forEach(r => {
  routes[r].routeName = r
})

export default routes
