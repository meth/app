import _ from 'lodash'
import moment from 'moment'
import path from 'path'
import fs from 'fs'
import chalk from 'chalk'
import shell from 'shelljs'
import childProcess from 'child_process'

export const toolsDir = () => __dirname
export const rootDir = () => path.join(toolsDir(), '..')
export const deployDataDir = () => path.join(toolsDir(), 'deploy', 'data')
export const iosDir = () => path.join(rootDir(), 'ios')
export const androidDir = () => path.join(rootDir(), 'android')

const stepsDir = path.join(toolsDir(), 'prebuild', 'steps')

export const STEPS =
  fs.readdirSync(stepsDir)
  .sort()
  .map(f => require(path.join(stepsDir, f)))

const ensureFolderExists = (folderPath) => {
  shell.mkdir('-p', folderPath)
}


export const parseEnv = (keysConfig) => _.reduce(keysConfig, (ret, config, key) => {
  let val = process.env[key]

  if (!val) {
    if (!config.hasOwnProperty('default')) {
      throw new Error(`You must specify ${key}`)
    }

    val = config.default
  } else {
    if (config.allowed && !config.allowed.includes(val)) {
      throw new Error(`Must use one of these values for ${key}: ${config.allowed.join(', ')}`)
    }

    val = config.sanitize ? config.sanitize(val) : val
  }

  ret[key] = val

  return ret
}, {})

export const availableModes = () => ['dev', 'qa', 'prod']

export const appAssetPath = (fileName, mode) =>
  path.join(toolsDir(), 'prebuild', 'config', mode || '_base', fileName)


export const writeFile = (fp, data) => (
  doStep(`Write file: ${fp}`, () => {
    ensureFolderExists(path.dirname(fp))
    fs.writeFileSync(
      fp,
      (typeof data === 'object') ? JSON.stringify(data, null, 2) : data,
      { encoding: 'utf-8' }
    )
  })
)


export const readFile = (fp) => (
  doStep(`Read file: ${fp}`, () =>
    fs.readFileSync(fp, { encoding: 'utf-8' }).toString()
  )
)


export const writeExecFile = (fp, data) => (
  doStep(`Write exec file: ${fp}`, () => {
    writeFile(fp, data)
    fs.chmodSync(fp, '0755')
  })
)

export const replaceInFile = (fp, needle, replacement) => (
  doStep(`Replace in file: ${fp}: ${needle} -> ${replacement}`, () => {
    // read it in
    const inStr = fs.readFileSync(fp).toString()
    // delete input file
    shell.rm('-f', fp)
    // replace and write out
    writeFile(fp, inStr.replace(needle, replacement))
  })
)

export const copyFile = (fp, dst) => (
  doStep(`Copy file: ${fp} -> ${dst}`, () => {
    shell.rm('-f', dst)
    ensureFolderExists(path.dirname(dst))
    shell.cp(fp, dst)
  })
)

export const fileExists = (fp) => (
  doStep(`Check if exists: ${fp}`, () =>
    shell.test('-e', fp)
  )
)

export const rmPath = (fp) => (
  doStep(`Remove path: ${fp}`, () =>
    shell.rm('-rf', fp)
  )
)

export const exec = (command, options = {}) => (
  doStep(`Execute command: ${command} (${JSON.stringify(options)})`, () =>
    childProcess.execSync(command, options).toString()
  )
)

export const Git = {
  getCommitHash: (dir) => (
    doStep(`Git get commit # for: ${dir}`, () =>
      exec(`git rev-parse HEAD`, { cwd: dir })
    )
  ),
  clone: (url, dir) => (
    doStep(`Git clone: ${url} into ${dir}`, () =>
      exec(`git clone --depth=1 ${url} ${dir}`)
    )
  ),
  commit: (dir, msg) => (
    doStep(`Git commit: ${msg} for ${dir}`, () =>
      exec(`git commit -am "${msg}"`, { cwd: dir })
    )
  ),
  push: (dir) => (
    doStep(`Git push: ${dir}`, () =>
      exec(`git push origin`, { cwd: dir })
    )
  ),
  logsSince: (dir, after) => {
    after = moment(after)

    return doStep(`Git log since ${after.toString()}`, () => {
      return exec(`git log --after='${after.toString()}' --pretty=format:'%s%n'`, {
        cwd: dir
      }).split('\n').reduce((m, v) => {
        if (v && v.length) {
          m.push(v)
        }

        return m
      }, [])
    })
  },
}

export const doStep = (str, fn, priority = 'debug') => {
  log[priority](`${str} ...`)
  log.indent++
  const ret = fn()
  log.indent--
  log[priority](`...done`)
  return ret
}

export const doInfoStep = (str, fn) => doStep(str, fn, 'info')


export const log = {
  indent: 0,
  format: (msg) => `${' '.repeat(log.indent * 2)}${msg}`,
  debug: (msg) => console.log(log.format(msg)),
  info: (msg) => console.log(chalk.yellow(log.format(msg))),
  alert: (msg) => console.log(chalk.cyan(log.format(msg))),
  error: (msg) => console.error(chalk.red(log.format(msg)))
}
