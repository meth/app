import _ from 'lodash'
import path from 'path'
import tmp from 'tmp'
import { doInfoStep, Git, rootDir, rmPath, appAssetPath, readFile, writeFile } from '../../utils'
import { version } from '../../../package.json'

const getInfoFrombuildConfigRepo = config => {
  const { INC_BUILD_NUMBER } = config

  const tmpDir = tmp.dirSync().name

  const buildConfigDir = path.join(tmpDir, 'meth-mobile-build-config')

  Git.clone('git@github.com:meth/build-config.git', buildConfigDir)

  const cfgFilePath = path.join(buildConfigDir, `buildConfig.json`)

  const cfg = JSON.parse(readFile(cfgFilePath))

  cfg.appVersion = version

  if (INC_BUILD_NUMBER) {
    cfg.buildNumber += 1

    writeFile(cfgFilePath, cfg)

    Git.commit(buildConfigDir, `Update build number to ${cfg.buildNumber}`)

    Git.push(buildConfigDir)
  }

  rmPath(tmpDir)

  return cfg
}

module.exports = config => {
  doInfoStep('Writing buildConfig.json', () => {
    const { BUILD_MODE, INSTABUG, ANALYTICS } = config

    const { buildNumber, appVersion } = getInfoFrombuildConfigRepo(config)

    const baseMode = require(appAssetPath('buildConfig.js'))
    const buildMode = require(appAssetPath('buildConfig.js', BUILD_MODE))

    const jsonConfig = Object.assign({
      appVersion,
      appBuildNumber: buildNumber,
      appMode: BUILD_MODE,
      gitCommit: Git.getCommitHash(rootDir()).toString().trim(),
      instabugEnabled: INSTABUG,
      analyticsEnabled: ANALYTICS
    }, baseMode, buildMode)

    writeFile(path.join(rootDir(), 'buildConfig.json'), jsonConfig)

    _.extend(config, jsonConfig)
  })
}
