export const getAbiFunctionNames = abi => {
  try {
    let json = abi

    if (typeof json === 'string') {
      json = JSON.parse(json)
    }

    return json
      .filter(({ type }) => type === 'function')
      .map(({ name }) => name)
  } catch (err) {
    return null
  }
}
