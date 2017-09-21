const define = arr =>
  arr.reduce((m, v) => {
    // eslint-disable-next-line no-param-reassign
    m[v] = v
    return m
  }, {})

module.exports = define([ 'CONNECT_NODE' ])
