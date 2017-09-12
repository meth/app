const define = arr =>
  arr.reduce((m, v) => {
    m[v] = v
    return m
  }, {})

module.exports = define(['CONNECT_NODE'])
