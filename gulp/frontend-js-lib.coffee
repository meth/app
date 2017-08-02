path = require 'path'
concatJs = require './utils/concat-js'


module.exports = (paths, options = {}) ->
  handler: ->
    concatJs
      src: path.join(paths.frontend.src, 'js-lib', '*.js')
      watchGlob: path.join(paths.frontend.src, 'js-lib', '*.js')
      outputName: 'globals.js'
      outputDir: path.join(paths.frontend.build, 'js')
      options: options
