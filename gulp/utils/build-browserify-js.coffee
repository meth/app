_ = require 'lodash'
browserify = require 'browserify'
browserifyBuiltIns = require 'browserify/lib/builtins'
source = require 'vinyl-source-stream2'
uglify = require 'gulp-uglify'
watchify = require 'watchify'
livereactload = require 'livereactload'
gulp = require 'gulp'
gutil = require 'gulp-util'
gulpIf = require 'gulp-if'





module.exports = (params) ->
  { paths, options, srcGlob, outputName, outputDir} = params

  # configure
  b = browserify(
    entries: srcGlob
    debug: !options.minifiedBuild
    cache: {}
    packageCache: {}
    plugin: if options.watchForChanges then [watchify, livereactload] else []
    commondir: false
    builtins: _.pick(browserifyBuiltIns, '_process')
    insertGlobals: false
  )

  # processing method
  _build = ->
    bundle = b.bundle()
    
    b.exclude('electron')

    if options.dontExitOnError
      bundle = bundle.on 'error', (err) ->
        gutil.log(err.stack)

    bundle
      .pipe source(outputName)
      .pipe gulpIf(options.minifiedBuild, uglify())
      .pipe gulp.dest(outputDir)

  
  if options.watchForChanges
    # From http://christianalfoni.github.io/javascript/2014/08/15/react-js-workflow.html
    b.on 'update', ->
      gutil.log 'Rerunning browserify...'
      updateStart = Date.now()
      _build().on 'end', ->
        gutil.log '...Done (' + (Date.now() - updateStart) + 'ms)'
        

  # kick-off
  _build()



