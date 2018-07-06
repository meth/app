import path from 'path'
import { rmPath, exec, doInfoStep, iosDir, writeFile, replaceInFile } from '../../utils'

module.exports = function (config) {
  doInfoStep('Update iOS native layer', () => {
    const {
      instabug: {
        ios: {
          token: instabugToken
        }
      },
      appName,
      appVersion,
      iosPkg,
      INSTABUG
    } = config

    if (!appName || !iosPkg) {
      throw new Error('Need both "appName" and "iosPkg" config values!')
    }

    doInfoStep('Update Info.plist', () => {
      replaceInFile(
        path.join(iosDir(), 'meth/Info.plist'),
        /CFBundleDisplayName<\/key>\s+<string>(.+)<\/string>/gm,
        `CFBundleDisplayName</key>\n<string>${appName}</string>`
      )

      replaceInFile(
        path.join(iosDir(), 'meth/Info.plist'),
        /CFBundleShortVersionString<\/key>\s+<string>(.+)<\/string>/gm,
        `CFBundleShortVersionString</key>\n<string>${appVersion}</string>`
      )
    })

    doInfoStep('Update pbxproj', () => {
      replaceInFile(
        path.join(iosDir(), 'meth.xcodeproj/project.pbxproj'),
        /PRODUCT_BUNDLE_IDENTIFIER = (.+);/gm,
        `PRODUCT_BUNDLE_IDENTIFIER = ${iosPkg};`
      )
    })

    doInfoStep('Write config.h', () => {
      writeFile(
        path.join(iosDir(), 'meth/config.h'),
        `
#define INSTABUG_ENABLED ${INSTABUG ? 1 : 0}
#define INSTABUG_TOKEN "${instabugToken}"
`
      )
    })

    doInfoStep('Setup Cocoapods', () => {
      rmPath(path.join(iosDir(), 'Pods'))

      exec('pod install', {
        cwd: iosDir()
      })
    })
  })
}
