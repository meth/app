export { isAddress, isHexStrict, toChecksumAddress } from 'web3-utils'

export const prefixWith0x = str => `0x${str}`

export const prefixedWith0x = str => str.substr(0, 2) === '0x'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
export const randStr = len => {
  let str = ''
  for (let i = 0; len > i; i += 1) {
    str += CHARS.charAt(Math.floor(Math.random() * CHARS.length))
  }
  return str
}
