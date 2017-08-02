pug = require 'gulp-pug'
gulp = require 'gulp'
path = require 'path'


module.exports = (paths, options = {}) ->
  handler: -> 
    gulp.src path.join(paths.frontend.src, 'pug', '*.pug')
      .pipe pug({
        locals:
          BUILD_MODE: options.mode
      })
      .pipe gulp.dest(path.join(paths.frontend.build))
