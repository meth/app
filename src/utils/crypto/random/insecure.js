import log from '../../../logger'

export default numBytes => {
  log.warn('Using insecure random bytes generator!')

  const ret = []

  for (let i = 0; numBytes / 4 > i; i += 1) {
    ret.push(Math.random() * 2147483647 /* 2**31-1 */)
  }

  return ret
}
