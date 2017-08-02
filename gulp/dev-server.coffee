gulp = require 'gulp'
gutil = require 'gulp-util'
livereload = require 'gulp-server-livereload'

module.exports = (paths, options = {}) ->
  handler: ->
    gulp.src paths.frontend.build
      .pipe livereload({
        host: '0.0.0.0'
        port: 3456
        livereload:
          enable: true
          host: '0.0.0.0'
          port: 53456
          filter: (filePath, cb) ->
            cb( !(/(node_modules|\.js)/.test(filePath)) )
        directoryListing: false
        open: false
      })
