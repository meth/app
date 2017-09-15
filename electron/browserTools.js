const Q = require('bluebird')
const installExtension = require('electron-devtools-installer').default
const {
  REACT_DEVELOPER_TOOLS,
  REDUX_DEVTOOLS
} = require('electron-devtools-installer')

const logger = require('./logger')

exports.installDefaultExtensions = () =>
  Q.all([
    installExtension(REACT_DEVELOPER_TOOLS),
    installExtension(REDUX_DEVTOOLS)
  ]).catch(err => {
    /* eslint-disable no-console */
    logger.error(err)
  })
