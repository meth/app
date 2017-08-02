path = require 'path'
copyFiles = require './utils/copy-files'

module.exports = (paths, options = {}) ->
  handler: ->
    copyFiles
      src: [
        path.join(paths.frontend.src, 'fonts', '**', '*.*')
      ]
      watchGlob: path.join(paths.frontend.src, 'fonts', '**', '*.*')
      outputDir: path.join(paths.frontend.build, 'fonts')
      options: options
