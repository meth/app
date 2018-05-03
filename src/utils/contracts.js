const parseAbi = abi => {
  let json = abi

  if (typeof json === 'string') {
    json = JSON.parse(json)
  }

  return json
}

const parseAndGetMethod = (abi, methodName) =>
  parseAbi(abi).find(
    ({ name, type }) => type === 'function' && name === methodName
  )

export const getAbiFunctionNames = abi => {
  try {
    return parseAbi(abi)
      .filter(({ type }) => type === 'function')
      .map(({ name }) => name)
  } catch (err) {
    return null
  }
}

export const isAbiFunctionReadOnly = (abi, methodName) => {
  const { stateMutability } = parseAndGetMethod(abi, methodName)

  return stateMutability === 'pure' || stateMutability === 'view'
}

export const getOrderedMethodParams = (abi, methodName, params) => {
  const { inputs } = parseAndGetMethod(abi, methodName)

  return inputs.reduce((m, { name }) => m.concat(params[name]), [])
}

export const methodHasOutputs = (abi, methodName) => {
  const { outputs } = parseAndGetMethod(abi, methodName)

  return outputs && !!outputs.length
}
