/* eslint-disable no-console */
if (!console.debug) {
  console.debug = console.log.bind(console)
}

console.error = (...args) => {
  throw new Error(args)
}
