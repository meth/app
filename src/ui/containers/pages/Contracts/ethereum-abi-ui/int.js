import { NUMBER } from './fieldTypes'

export default class Int {
  constructor (abiType) {
    // skip the "int" part at the start
    let M = abiType.substr(3)
    if (!M.length) {
      M = '256'
    }
    M = parseInt(M, 10)
    this.maxInt = 2 ** M
    this.minInt = -this.maxInt
  }
  fieldType = () => NUMBER
  isValid = val => {
    const v = parseInt(val, 10)

    if (Number.isNaN(v)) {
      return false
    }

    return v >= this.minInt && v <= this.maxInt
  }
  sanitize = v => (v || '').trim()
}
