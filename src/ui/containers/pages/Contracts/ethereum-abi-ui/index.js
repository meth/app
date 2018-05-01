import { SUPPORTED_INPUT_TYPES, buildInput } from './inputTypes'
import { getMethodDefinition } from './utils'

export const getSupportedParamTypes = () => SUPPORTED_INPUT_TYPES

export const canRenderMethodParams = (abi, method) => {
  const def = getMethodDefinition(abi, method)
  if (!def) {
    return false
  }

  let can = true

  def.inputs.forEach(input => {
    const { type } = input

    can = can && SUPPORTED_INPUT_TYPES.reduce((m, st) => (
      m || type.startsWith(st)
    ), false)
  })

  return can
}

export const renderMethodParams = (abi, method, renderField) => {
  if (!canRenderMethodParams(abi, method)) {
    throw new Error('Cannot render method, not all types supported')
  }

  const def = getMethodDefinition(abi, method)
  if (!def) {
    return
  }

  def.inputs.forEach(input => {
    const instance = buildInput(input)

    renderField(input.name, {
      type: instance.fieldType(),
      isValid: arg => instance.isValid(arg),
      sanitize: arg => instance.sanitize(arg)
    })
  })
}
