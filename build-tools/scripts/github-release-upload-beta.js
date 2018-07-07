import fs from 'fs'
import path from 'path'
import GitHub from 'github-api'
import { exec } from '../utils'
import { version } from '../../package.json'

const { GITHUB_TOKEN } = process.env
const DIR = path.resolve(path.join(__dirname, '..', '..'))
const DESKTOP_PKG_DIR = path.join(DIR, 'out', 'make')

const _exec = cmd => {
  exec(cmd, { cwd: DIR })
}

const build = async () => {
  const gh = new GitHub({
    token: GITHUB_TOKEN
  })

  const repo = gh.getRepo('meth', 'app')

  const tagPrefix = `v${version}-beta`

  // work out beta number
  const { data: existing } = await repo.listTags()
  let betaNumber = 1
  existing.forEach(({ name }) => {
    if (name.startsWith(tagPrefix)) {
      const n = parseInt(name.substr(tagPrefix.length), 10)
      if (!Number.isNaN(n)) {
        betaNumber = parseInt(Math.max(betaNumber, n + 1), 10)
      }
    }
  })

  const tag = `v${version}-beta${betaNumber}`

  const newReleaseDetails = {
    tag_name: tag,
    target_commitish: process.env.CIRCLE_SHA1 || 'qa',
    name: tag,
    draft: true,
    prerelease: true
  }

  const { data: release } = await repo.createRelease(newReleaseDetails)

  console.log(`Release ID for ${tag}: ${release.id}`)

  let { upload_url: uploadUrl } = release
  if (0 < uploadUrl.indexOf('{')) {
    uploadUrl = uploadUrl.substr(0, uploadUrl.indexOf('{'))
  }

  console.log(`Asset upload URL for ${tag}: ${uploadUrl}`)

  fs.readdirSync(DESKTOP_PKG_DIR).forEach(file => {
    const filePath = path.join(DESKTOP_PKG_DIR, file)

    console.log(`Uploading ${filePath} to release ${tag} ...`)

    _exec(`curl --data-binary @"${filePath}" -H "Authorization: token ${GITHUB_TOKEN}" -H "Content-Type: application/octet-stream" ${uploadUrl}?name=${encodeURIComponent(file)}`)
  })

  // public the release
  console.log(`Publishing release ${tag} ...`)

  await repo.updateRelease(release.id, Object.assign({}, newReleaseDetails, {
    draft: false
  }))
}

build().catch(err => {
  console.error(err)
  process.exit(-1)
})
