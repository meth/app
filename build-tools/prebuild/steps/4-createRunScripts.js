import path from 'path'
import { doInfoStep, writeExecFile, toolsDir } from '../../utils'

module.exports = function (config) {
  doInfoStep('Create run scripts', () => {
    writeExecFile(
      path.join(toolsDir(), 'run-scripts', 'run-android'),
`#!/bin/bash
set -e
node_modules/.bin/react-native run-android defaultConfig
`
    )

    writeExecFile(
      path.join(toolsDir(), 'run-scripts', 'run-ios'),
`#!/bin/bash
set -e
node_modules/.bin/react-native run-ios
`
    )
  })
}
