import path from 'path'
import got from 'got'
import fs from 'fs'
import FormData from 'form-data'

import { appName, appId, appVersion, appBuildNumber } from '../../buildConfig.json'
import { apiKey } from '../.config/testFairy.json'
import { readFile, deployDataDir, fileExists, copyFile } from '../utils'

const renameApkFile = apkPath => {
  // copy and set proper APK name
  const fileName = path.basename(apkPath, '.apk')
  const finalApkPath = path.join(__dirname, 'data', `${appId}-${fileName}-${appBuildNumber}.apk`)
  copyFile(apkPath, finalApkPath)

  return finalApkPath
}

const upload = (apkPath, comment) => {
  // upload
  console.log('Upload APK ...')

  const startTime = Date.now()

  const form = new FormData()
  form.append('api_key', apiKey)
  form.append('file', fs.createReadStream(apkPath))
  form.append('video', 'wifi')
  form.append('duration', '10m')
  form.append('comment', comment)
  form.append('testers-groups', 'internal')
  form.append('auto-update', 'off')
  form.append('notify', 'on')
  form.append('instrumentation', 'off')

  return got.post(`https://app.testfairy.com/api/upload/`, {
    body: form
  })
  .then(res => {
    console.log(`Upload took: ${parseInt((Date.now() - startTime) / 1000)} seconds`)

    return res.body
  })
}

const apkPath = process.argv.pop()

if (0 > apkPath.indexOf('.apk') || !fileExists(apkPath)) {
  throw new Error(`APK not found: ${apkPath}`)
}

const releaseNotes = readFile(path.join(deployDataDir(), 'releaseNotes.txt'))

upload(
  renameApkFile(apkPath),
  `Build ${appVersion} (${appBuildNumber}) for ${appName} (${appId})\n\n${releaseNotes}`
)
  .then(jsonStr => {
    const json = JSON.parse(jsonStr)

    console.log(JSON.stringify(json, null, 2))

    if ('ok' !== json.status) {
      throw new Error(`Upload failed: ${json.message}`)
    }
  })
  .catch(err => {
    console.error(err)

    process.exit(-1)
  })
