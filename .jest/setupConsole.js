/* eslint-disable no-console */
if (!console.debug) {
  console.debug = console.log.bind(console)
}

global.sleepAsync = ms => new Promise(resolve => setTimeout(resolve, ms))
