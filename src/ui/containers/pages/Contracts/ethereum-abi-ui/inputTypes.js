import AddressType from './address'
import BoolType from './bool'
import UintType from './uint'
import IntType from './int'
import StringType from './string'

export const SUPPORTED_INPUT_TYPES = [
  'address',
  'bool',
  'string',
  'int',
  'uint'
]

const MAPPING = {
  address: AddressType,
  bool: BoolType,
  string: StringType,
  int: IntType,
  uint: UintType
}

export const buildInput = input => {
  const { type } = input

  let instance
  Object.keys(MAPPING).forEach(supportedType => {
    if (type.startsWith(supportedType)) {
      instance = new MAPPING[supportedType](type)
    }
  })

  if (!instance) {
    throw new Error(`Unsupported input type: ${type}`)
  }

  return instance
}
