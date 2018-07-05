const fs = require('fs')
const path = require('path')

const { productName } = require('./package.json')

const buildPath = (...args) => path.join('.', ...args)

const PATHS_TO_INCLUDE = [
  buildPath('build', 'web'),
  buildPath('electron'),
  buildPath('common'),
  buildPath('node_modules'),
  buildPath('buildConfig.json'),
  buildPath('package.json'),
  buildPath('LICENSE.md'),
]

const EXTS_TO_IGNORE = [ 'map', 'o', 'obj' ]

const shouldIncludePath = filePath => PATHS_TO_INCLUDE.reduce((soFar, p) => (
  soFar || filePath.startsWith(p) || (p.startsWith(filePath) && p.charAt(filePath.length) === '/')
), false)

module.exports = {
  makers: [
    {
      name: '@electron-forge/maker-zip',
      platforms: ['linux', 'win32']
    },
    {
      name: '@electron-forge/maker-dmg',
      platforms: ['darwin'],
      config: {
        overwrite: true,
        icon: path.join(__dirname, 'build-tools', 'packaging', 'logo.png'),
        background: path.join(__dirname, 'build-tools', 'packaging', 'dmg', 'background.png'),
      }
    },
    // {
    //   name: '@electron-forge/maker-squirrel',
    //   platforms: ['win32'],
    //   config: {
    //     authors: 'Ramesh Nair',
    //     name: productName,
    //     setupExe: `${productName} Setup`,
    //     setupMsi: `${productName} Installer`,
    //     setupIcon: path.join(__dirname, 'build-tools', 'packaging', 'logo.ico'),
    //   }
    // }
  ],
  packagerConfig: {
    appCopyright: 'Copyright (c) HiddenTao Ltd 2018',
    appCategoryType: 'public.app-category.finance',
    prune: true,
    icon: path.join(__dirname, 'build-tools', 'packaging', 'logo'),
    ignore: filePath => {
      let f = buildPath(filePath)
      let ret

      if ('.' === f) {
        ret = false
      } else if (EXTS_TO_IGNORE.includes(path.extname(f).substr(1))) {
        ret = true
      } else {
        ret = !shouldIncludePath(f)
      }

      // fs.appendFileSync(buildPath('build', 'ignore.txt'), `${f} -> ${ret}\n`)

      return ret
    }
  }
}
