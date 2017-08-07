import dispatcher from './data/dispatcher'
import RootComponent from './ui/Page'

module.exports = {
  name: 'ConnectToNode',
  reducers: require('./data/reducers'),
  dispatcher,
  RootComponent,
}
