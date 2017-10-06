import modalsSagas from './modals/sagas'
import configSagas from './config/sagas'

export default function* (){
  yield [ modalsSagas(), configSagas() ]
}
