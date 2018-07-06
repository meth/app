import fs from 'fs'
import path from 'path'
import GitHub from 'github-api'
import shell from 'shelljs'
import { version } from '../../package.json'

const { GITHUB_TOKEN } = process.env
const DIR = path.resolve(path.join(__dirname, '..', '..'))
const DESKTOP_PKG_DIR = path.join(DIR, 'out', 'make')

const exec = cmd => {
  const { code, stdout, stderr } = shell.exec(cmd, { cwd: DIR })

  if (0 !== code) {
    console.error(stdout)
    console.error(stderr)
    throw new Error(`Error executing command (exit code: ${code}): ${cmd}`)
  }
}

const build = async () => {
  const gh = new GitHub({
    token: GITHUB_TOKEN
  })

  const repo = gh.getRepo('meth', 'app')

  const tag = `v${version}-beta`

  const newReleaseDetails = {
    tag_name: tag,
    target_commitish: 'dev',
    name: tag,
    draft: true,
    prerelease: true
  }

  const { data: release } = await repo.createRelease(newReleaseDetails)

  console.log(`Release ID: ${release.id}`)

  let { upload_url: uploadUrl } = release
  if (0 < uploadUrl.indexOf('{')) {
    uploadUrl = uploadUrl.substr(0, uploadUrl.indexOf('{'))
  }

  console.log(`Asset upload URL: ${uploadUrl}`)

  fs.readdirSync(DESKTOP_PKG_DIR).forEach(file => {
    const filePath = path.join(DESKTOP_PKG_DIR, file)

    console.log(`Uploading ${filePath} ...`)

    // exec(`curl --data-binary @"${filePath}" -H "Authorization: token ${GITHUB_TOKEN}" -H "Content-Type: application/octet-stream" ${uploadUrl}?name=${encodeURIComponent(file)}`)
  })

  // public the release
  console.log(`Publishing pre-release ...`)

  await repo.updateRelease(release.id, Object.assign({}, newReleaseDetails, {
    draft: false
  }))
}

build().catch(err => {
  console.error(err)
  process.exit(-1)
})
