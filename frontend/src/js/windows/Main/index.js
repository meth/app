import dispatcher from './data/dispatcher'
import RootComponent from './ui/Page'

module.exports = {
  name: 'Main',
  reducers: require('./data/reducers'),
  dispatcher,
  RootComponent,
}
