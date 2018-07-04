import fs from 'fs'
import got from 'got'
import path from 'path'
import GitHub from 'github-api'
import shell from 'shelljs'
import { version } from '../../package.json'

const { GITHUB_TOKEN } = process.env
const DIR = path.resolve(path.join(__dirname, '..', '..'))
const DESKTOP_PKG_DIR = path.join(DIR, 'out', 'make')

const exec = cmd => shell.exec(cmd, { cwd: DIR })

const build = async () => {
  // exec('yarn setup:qa')
  // exec('yarn lint:js')
  // exec('yarn test')

  console.log('Building mobile apps...')

  // exec('bundle exec fastlane ios beta')
  // exec('bundle exec fastlane android beta')

  console.log('Building desktop apps...')

  // exec('yarn web:package')

  const gh = new GitHub({
    token: GITHUB_TOKEN
  })

  const repo = gh.getRepo('meth', 'app')

  const tag = `v${version}-beta`

  const { data: release } = await repo.createRelease({
    tag_name: tag,
    target_commitish: 'dev',
    name: tag,
    draft: true,
    prerelease: true
  })

  console.log(`Release ID: ${release.id}`)

  let { upload_url: uploadUrl } = release
  if (0 < uploadUrl.indexOf('{')) {
    uploadUrl = uploadUrl.substr(0, uploadUrl.indexOf('{'))
  }

  console.log(`Asset upload URL: ${uploadUrl}`)

  await Promise.all(fs.readdirSync(DESKTOP_PKG_DIR).map(file => {
    const filePath = path.join(DESKTOP_PKG_DIR, file)

    let mime
    switch (path.extname(file)) {
      case '.dmg':
        mime = 'application/x-apple-diskimage'
        break
      default:
        return Promise.reject(new Error(`Unable to determine file type: ${filePath}`))
    }

    console.log(`Uploading ${filePath} of type ${mime} ...`)

    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(filePath)
        .pipe(got.stream.post(`${uploadUrl}?name=${encodeURIComponent(file)}`, {
          headers: {
            'Content-Type': mime,
            Authorization: `token ${GITHUB_TOKEN}`
          }
        }))

      stream.on('close', () => {
        console.log('...done :)')
        resolve()
      })

      stream.on('error', err => {
        console.error('...failed :/')

        reject(err)
      })
    })
    // return got.post(`${uploadUrl}?name=${encodeURIComponent(file)}`, {
    //   body: fs.createReadStream(filePath),
    //   headers: {
    //     'Content-Type': mime,
    //     Authorization: `token ${GITHUB_TOKEN}`
    //   }
    // }).then(() => { console.log(`...done!`) })
  }))
}

build().catch(err => {
  console.error(err)
  process.exit(-1)
})
