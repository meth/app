import { isAddress } from '../../../../../utils/string'

const SUPPORTED_INPUT_TYPES = [
  'address',
  'bool',
  'string',
  'int',
  'uint'
]

const _getAbiJson = abi => {
  let json = abi

  try {
    if (typeof json === 'string') {
      json = JSON.parse(json)
    }
  } catch (err) {
    throw new Error('Invalid ABI json')
  }

  return json
}

const _getMethod = (abi, method) => {
  const json = _getAbiJson(abi)

  return json.find(({ type, name }) => (
    name === method && type === 'function'
  ))
}

export const getSupportedTypes = () => SUPPORTED_INPUT_TYPES

export const canRender = (abi, method) => {
  const def = _getMethod(abi, method)
  let can = true

  def.inputs(input => {
    const { type } = input

    can = can && SUPPORTED_INPUT_TYPES.reduce((m, st) => (
      m || type.startsWith(st)
    ), false)
  })

  return can
}

export const isValidAddress = addr => addr && isAddress(addr)

export const sanitizeAddress = addr => {
  if (addr) {
    if (!addr.startsWith('0x')) {
      return `0x${addr}`
    }
  }

  return addr
}

export const renderMethodForm = (abi, method, renderField) => {
  if (!canRender(abi, method)) {
    throw new Error('Cannot render method, not all types supported')
  }

  methodDef.inputs.forEach(input => {
    switch (input.type) {
      case 'address': {
        renderField(input.name, sanitizeAddress, isValidAddress)
        break
      }
    }
    renderInput(input)
  })
}
