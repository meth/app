module.exports = (options, paths = {}, tasks) ->
  return {
    deps: [
      'frontend-img'
      'frontend-fonts'
      'frontend-js'
      'frontend-js-lib'
      'frontend-pug'
    ]
  }
