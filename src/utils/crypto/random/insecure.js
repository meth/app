import log from '../../../logger'

export default (numBytes, as32bitWords = false) => {
  log.warn('Using insecure random bytes generator!')

  const ret = []

  const maxIndex = as32bitWords ? (numBytes / 4) : numBytes
  const maxNum = as32bitWords ? 2147483647 /* 2**31-1 */ : 256 /* 2**8 */

  for (let i = 0; maxIndex > i; i += 1) {
    ret.push(Math.random() * maxNum)
  }

  return ret
}
