import log from '../../../logger'

const getInsecureRandomBytes = numBytes => {
  log.warn('Using insecure random bytes generator!')

  const ret = []

  for (let i = 0; numBytes / 4 > i; i += 1) {
    ret.push(Math.random() * 2147483647 /* 2**31-1 */)
  }

  return ret
}

export default async numBytes => {
  if (!window.crypto.getRandomValues) {
    return getInsecureRandomBytes(numBytes)
  }

  const array = new Uint32Array(numBytes / 4)

  window.crypto.getRandomValues(array)

  return Array.from(array)
}
