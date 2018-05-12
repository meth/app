import path from 'path'
import { doInfoStep, appAssetPath, deployDataDir, copyFile, rmPath, fileExists } from '../../utils'

module.exports = () => {
  doInfoStep('Setup deploy config', () => {
    doInfoStep('Setup TestFairy config', () => {
      const srcPath = appAssetPath('testFairy.json')
      const dstPath = path.join(deployDataDir(), 'testFairy.json')
      rmPath(dstPath)

      if (fileExists(srcPath)) {
        copyFile(srcPath, dstPath)
      }
    })
  })
}
