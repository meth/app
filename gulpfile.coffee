_ = require 'lodash'
path = require('path')

fs = require 'fs'
gulp = require('gulp')
gutil = require 'gulp-util'
args = require('yargs').argv

options = 
  mode: if args.production then 'production' else 'development'
  minifiedBuild: !!args.minified
  dontExitOnError: false
  watchForChanges: !!args.watch
  ci: !!args.ci


if options.minifiedBuild
  console.log 'MINIFIED build'
else
  console.log 'Non-MINIFIED build'
 

# paths

paths =
  npm: path.join(__dirname, 'node_modules')
  projectRoot: __dirname
  frontend: 
    src: path.join(__dirname, 'frontend', 'src')
    build: path.join(__dirname, 'frontend', 'build') 


# initialisation
# 

# find available gulp task files
tasksFolder = path.join(__dirname, 'gulp')
taskFiles = fs.readdirSync tasksFolder
tasks = {}

for tf in taskFiles
  if '.coffee' isnt path.extname(tf)
    continue
  taskName = path.basename(tf, '.coffee')
  tasks[taskName] = tf

# setup gulp tasks
_.each tasks, (file, name) ->
  # get task info
  constructorFn = require(path.join(tasksFolder, file))
  { handler, deps } = constructorFn(paths, options, tasks)

  handler or= undefined
  deps or= []

  gulp.task name, deps, handler


# default task
gulp.task 'default', ['dev']
