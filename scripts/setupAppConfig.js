const path = require('path')
const fs = require('fs')

const FP = path.join(__dirname, '..', 'appConfig.json')

let config

try {
  /* eslint-disable global-require */
  /* eslint-disable import/no-dynamic-require */
  config = require(FP)
  /* eslint-enable global-require */
  /* eslint-enable import/no-dynamic-require */
} catch (err) {
  // eslint-disable-next-line no-console
  console.log('File not found')
}

const mode = process.argv[process.argv.length - 1]
if (![ 'dev', 'qa', 'prod' ].includes(mode)) {
  throw new Error(`Unsupported mode: ${mode}`)
}

if (!config || config.mode !== mode) {
  config = { mode }

  if ('prod' === mode) {
    config.backend = 'https://sync.meth.app/db'
  } else {
    config.backend = 'https://sync-dev.meth.app/db'
  }

  fs.writeFileSync(FP, JSON.stringify(config, null, 2))
}
