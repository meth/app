path = require 'path'
buildBrowserifyJs = require './utils/build-browserify-js'


module.exports = (paths, options = {}) ->
  handler: ->
    buildBrowserifyJs
      srcGlob: path.join(paths.frontend.src, 'js', 'app.js')
      watchGlob: path.join(paths.frontend.src, 'js', '**', '**', '*.js')
      outputName: 'app.js'
      outputDir: path.join(paths.frontend.build, 'js')
      options: options
