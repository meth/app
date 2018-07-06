import path from 'path'
import got from 'got'
import moment from 'moment'
import authToken from 'basic-auth-token'
import { email, apiKey, projectId } from '../.config/testFairy.json'
import { deployDataDir, writeFile, rootDir, Git } from '../utils'

// fetch latest testfairy build
got(`https://app.testfairy.com/api/1/projects/${projectId}/builds/`, {
  headers: {
    Authorization: `Basic ${authToken(email, apiKey)}`
  }
})
  .then(res => {
    try {
      const json = JSON.parse(res.body)

      return moment(json.builds[0].uploadDate)
    } catch (err) {
      throw new Error(err.message + ': body=' + res.body)
    }
  })
  .then(lastBuildDate => {
    const logs = Git.logsSince(rootDir(), lastBuildDate)

    const logStr = (logs.length) ? '- ' + logs.join('\n- ') : ''

    writeFile(path.join(deployDataDir(), 'releaseNotes.txt'), logStr)

    console.log(`Generated release notes:\n${logStr}`)
  })
  .catch(err => {
    console.error(err)

    process.exit(-1)
  })
