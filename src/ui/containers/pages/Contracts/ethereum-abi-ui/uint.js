import { NUMBER } from './fieldTypes'

export default class Uint {
  constructor (abiType) {
    // skip the "int" part at the start
    let M = abiType.substr(3)
    if (!M.length) {
      M = '256'
    }
    M = parseInt(M, 10)
    this.maxInt = 2 ** M
    this.minInt = 0
  }
  fieldType = () => NUMBER
  placeholderText = () => `123...`
  isValid = val => {
    const v = parseInt(val, 10)

    if (Number.isNaN(v)) {
      return false
    }

    return v >= this.minInt && v <= this.maxInt
  }
  sanitize = v => (v || '').trim()
}
