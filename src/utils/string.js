export { isAddress, isHexStrict } from 'web3-utils'

export const prefixWith0x = str => `0x${str}`

export const prefixedWith0x = str => str.substr(0, 2) === '0x'
